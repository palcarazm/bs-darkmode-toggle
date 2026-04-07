import { LocalStorage } from "../../../../../main/ts/core/storage/providers/LocalStorage";

describe("LocalStorage", () => {
    let localStorage: LocalStorage;
    let localStorageMock: { [key: string]: string };
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
        localStorage = new LocalStorage();
        localStorageMock = {};
        
        Object.defineProperty(globalThis, "localStorage", {
            value: {
                getItem: jest.fn((key: string) => localStorageMock[key] || null),
                setItem: jest.fn((key: string, value: string) => {
                    localStorageMock[key] = value;
                }),
                removeItem: jest.fn((key: string) => {
                    delete localStorageMock[key];
                }),
                clear: jest.fn(() => {
                    localStorageMock = {};
                }),
                length: 0,
                key: jest.fn(),
            },
            writable: true,
            configurable: true,
        });

        consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    describe("get", () => {
        it("should return null when key does not exist", () => {
            const result = localStorage.get("non-existent");
            expect(result).toBeNull();
            expect(globalThis.localStorage?.getItem).toHaveBeenCalledWith("non-existent");
        });

        it("should return value when key exists", () => {
            localStorageMock["test"] = "value";
            const result = localStorage.get("test");
            expect(result).toBe("value");
            expect(globalThis.localStorage?.getItem).toHaveBeenCalledWith("test");
        });

        it("should return null when localStorage is not available", () => {
            Object.defineProperty(globalThis, "localStorage", {
                value: undefined,
                writable: true,
                configurable: true,
            });

            const result = localStorage.get("any-key");
            expect(result).toBeNull();
        });

        it("should handle localStorage.getItem throwing an error", () => {
            const error = new Error("Storage quota exceeded");
            (globalThis.localStorage?.getItem as jest.Mock).mockImplementationOnce(() => {
                throw error;
            });

            const result = localStorage.get("test");
            expect(result).toBeNull();
            expect(consoleWarnSpy).toHaveBeenCalledWith("Unable to access localStorage:", error);
        });

        it("should handle getItem with null value", () => {
            (globalThis.localStorage?.getItem as jest.Mock).mockReturnValueOnce(null);
            const result = localStorage.get("test");
            expect(result).toBeNull();
        });

        it("should handle special characters in key", () => {
            const specialKey = "!@#$%^&*()_+-=test";
            localStorageMock[specialKey] = "special-value";
            const result = localStorage.get(specialKey);
            expect(result).toBe("special-value");
        });

        it("should handle numeric values as strings", () => {
            localStorageMock["number"] = "12345";
            const result = localStorage.get("number");
            expect(result).toBe("12345");
        });

        it("should handle JSON string values", () => {
            const jsonValue = JSON.stringify({ theme: "dark", version: 2 });
            localStorageMock["config"] = jsonValue;
            const result = localStorage.get("config");
            expect(result).toBe(jsonValue);
        });
    });

    describe("set", () => {
        it("should set a value in localStorage", () => {
            localStorage.set("test", "value", 3600000);
            expect(localStorageMock["test"]).toBe("value");
            expect(globalThis.localStorage?.setItem).toHaveBeenCalledWith("test", "value");
        });

        it("should overwrite an existing value", () => {
            localStorage.set("test", "first", 3600000);
            expect(localStorageMock["test"]).toBe("first");
            
            localStorage.set("test", "second", 3600000);
            expect(localStorageMock["test"]).toBe("second");
            expect(globalThis.localStorage?.setItem).toHaveBeenCalledTimes(2);
        });

        it("should handle empty string value", () => {
            localStorage.set("empty", "", 3600000);
            expect(localStorageMock["empty"]).toBe("");
        });

        it("should handle null-like values as strings", () => {
            localStorage.set("null", "null", 3600000);
            expect(localStorageMock["null"]).toBe("null");
        });

        it("should ignore TTL parameter", () => {
            localStorage.set("no-expiry", "value", 0);
            expect(localStorageMock["no-expiry"]).toBe("value");
            
            localStorage.set("no-expiry", "new-value", -1000);
            expect(localStorageMock["no-expiry"]).toBe("new-value");
        });

        it("should handle localStorage.setItem throwing an error (quota exceeded)", () => {
            const error = new Error("QuotaExceededError");
            (globalThis.localStorage?.setItem as jest.Mock).mockImplementationOnce(() => {
                throw error;
            });

            localStorage.set("test", "value", 3600000);
            expect(consoleWarnSpy).toHaveBeenCalledWith("Unable to write to localStorage:", error);
            expect(localStorageMock["test"]).toBeUndefined();
        });

        it("should handle localStorage.setItem throwing SecurityError", () => {
            const error = new Error("SecurityError");
            (globalThis.localStorage?.setItem as jest.Mock).mockImplementationOnce(() => {
                throw error;
            });

            localStorage.set("test", "value", 3600000);
            expect(consoleWarnSpy).toHaveBeenCalledWith("Unable to write to localStorage:", error);
        });

        it("should handle when localStorage is not available", () => {
            Object.defineProperty(globalThis, "localStorage", {
                value: undefined,
                writable: true,
                configurable: true,
            });

            expect(() => localStorage.set("test", "value", 3600000)).not.toThrow();
        });

        it("should handle special characters in key and value", () => {
            const specialKey = "!@#$%^&*()";
            const specialValue = "~`[]{}|\\;:'\",.<>/?";
            localStorage.set(specialKey, specialValue, 3600000);
            expect(localStorageMock[specialKey]).toBe(specialValue);
        });

        it("should handle very long values", () => {
            const longValue = "x".repeat(10000);
            localStorage.set("long", longValue, 3600000);
            expect(localStorageMock["long"]).toBe(longValue);
        });
    });

    describe("delete", () => {
        it("should delete an existing key", () => {
            localStorageMock["to-delete"] = "value";
            localStorage.delete("to-delete");
            expect(localStorageMock["to-delete"]).toBeUndefined();
            expect(globalThis.localStorage?.removeItem).toHaveBeenCalledWith("to-delete");
        });

        it("should not throw when deleting non-existent key", () => {
            expect(() => localStorage.delete("non-existent")).not.toThrow();
            expect(globalThis.localStorage?.removeItem).toHaveBeenCalledWith("non-existent");
        });

        it("should handle delete with empty key", () => {
            expect(() => localStorage.delete("")).not.toThrow();
            expect(globalThis.localStorage?.removeItem).toHaveBeenCalledWith("");
        });

        it("should not affect other keys when deleting", () => {
            localStorageMock["keep1"] = "value1";
            localStorageMock["keep2"] = "value2";
            localStorageMock["delete"] = "value3";
            
            localStorage.delete("delete");
            
            expect(localStorageMock["keep1"]).toBe("value1");
            expect(localStorageMock["keep2"]).toBe("value2");
            expect(localStorageMock["delete"]).toBeUndefined();
        });

        it("should handle localStorage.removeItem throwing an error", () => {
            const error = new Error("Some storage error");
            (globalThis.localStorage?.removeItem as jest.Mock).mockImplementationOnce(() => {
                throw error;
            });

            localStorage.delete("test");
            expect(consoleWarnSpy).toHaveBeenCalledWith("Unable to remove from localStorage:", error);
        });

        it("should handle when localStorage is not available", () => {
            Object.defineProperty(globalThis, "localStorage", {
                value: undefined,
                writable: true,
                configurable: true,
            });

            expect(() => localStorage.delete("test")).not.toThrow();
        });

        it("should handle delete on key with special characters", () => {
            const specialKey = "!@#$%^&*()_+-=test";
            localStorageMock[specialKey] = "value";
            localStorage.delete(specialKey);
            expect(localStorageMock[specialKey]).toBeUndefined();
        });
    });

    describe("Integration - multiple operations", () => {
        it("should handle set, get, delete sequence correctly", () => {
            // Set
            localStorage.set("seq1", "first", 3600000);
            expect(localStorage.get("seq1")).toBe("first");
            
            // Update
            localStorage.set("seq1", "updated", 3600000);
            expect(localStorage.get("seq1")).toBe("updated");
            
            // Delete
            localStorage.delete("seq1");
            expect(localStorage.get("seq1")).toBeNull();
        });

        it("should handle multiple keys simultaneously", () => {
            const items = [
                { key: "user1", value: "John" },
                { key: "user2", value: "Jane" },
                { key: "user3", value: "Bob" },
                { key: "user4", value: "Alice" },
                { key: "user5", value: "Charlie" }
            ];
            
            items.forEach(item => {
                localStorage.set(item.key, item.value, 3600000);
            });
            
            items.forEach(item => {
                expect(localStorage.get(item.key)).toBe(item.value);
            });
            
            // Delete some
            localStorage.delete("user2");
            localStorage.delete("user4");
            
            expect(localStorage.get("user1")).toBe("John");
            expect(localStorage.get("user2")).toBeNull();
            expect(localStorage.get("user3")).toBe("Bob");
            expect(localStorage.get("user4")).toBeNull();
            expect(localStorage.get("user5")).toBe("Charlie");
        });
    });
});