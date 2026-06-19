import { CookieStorage } from "../../../../../main/ts/core/storage/providers/CookieStorage";

describe("CookieStorage", () => {
    let cookieStorage: CookieStorage;
    let cookieStore: string;

    beforeEach(() => {
        cookieStorage = new CookieStorage();
        cookieStore = "";

        Object.defineProperty(globalThis.document, "cookie", {
            get: jest.fn(() => cookieStore),
            set: jest.fn((val: string) => {
                const [newCookie] = val.split(";");
                const name = newCookie.split("=")[0];
                
                const cookies = cookieStore
                    .split("; ")
                    .filter(c => c && !c.startsWith(name + "="));
                
                if (newCookie.split("=")[1] !== undefined) {
                    cookies.push(newCookie);
                }
                
                cookieStore = cookies.join("; ");
            }),
            configurable: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("get", () => {
        it("should return null when cookie does not exist", () => {
            const result = cookieStorage.get("non-existent");
            expect(result).toBeNull();
        });

        it("should return cookie value when it exists", () => {
            globalThis.document.cookie = "test=value";
            const result = cookieStorage.get("test");
            expect(result).toBe("value");
        });

        it("should decode URI encoded cookie values", () => {
            globalThis.document.cookie = "encoded=" + encodeURIComponent("hello world");
            const result = cookieStorage.get("encoded");
            expect(result).toBe("hello world");
        });

        it("should handle multiple cookies and find the correct one", () => {
            globalThis.document.cookie = "a=1";
            globalThis.document.cookie = "b=2";
            globalThis.document.cookie = "c=3";
            
            expect(cookieStorage.get("b")).toBe("2");
        });

        it("should handle cookies with spaces in name", () => {
            globalThis.document.cookie = "test_cookie=space value";
            const result = cookieStorage.get("test_cookie");
            expect(result).toBe("space value");
        });

        it("should handle cookie with special characters in value", () => {
            globalThis.document.cookie = "special=" + encodeURIComponent("!@#$%^&*()");
            const result = cookieStorage.get("special");
            expect(result).toBe("!@#$%^&*()");
        });

        it("should return null when cookie name is empty string", () => {
            const result = cookieStorage.get("");
            expect(result).toBeNull();
        });

        it("should throw an error when document.cookie access is denied", () => {
            Object.defineProperty(globalThis.document, "cookie", {
                get: jest.fn(() => { throw new Error("Access denied"); }),
                set: jest.fn(),
                configurable: true,
            });

            expect(() => cookieStorage.get("test")).toThrow("CookieStorage error: Access denied");
        });
    });

    describe("set", () => {
        it("should set a cookie with TTL", () => {
            const ttl = 3600000;
            cookieStorage.set("test", "value", ttl);
            
            expect(document.cookie).toContain("test=value");
        });

        it("should set a cookie with different TTL values", () => {
            const ttl = 86400000;
            cookieStorage.set("long", "persist", ttl);
            expect(document.cookie).toContain("long=persist");
        });

        it("should overwrite an existing cookie with the same name", () => {
            cookieStorage.set("test", "first", 3600000);
            expect(cookieStorage.get("test")).toBe("first");
            
            cookieStorage.set("test", "second", 3600000);
            expect(cookieStorage.get("test")).toBe("second");
        });

        it("should handle special characters in value", () => {
            cookieStorage.set("special", "!@#$%^&*()", 3600000);
            expect(cookieStorage.get("special")).toBe("!@#$%^&*()");
        });

        it("should throw an error when document.cookie access is denied", () => {
            Object.defineProperty(globalThis.document, "cookie", {
                get: jest.fn(),
                set: jest.fn(() => { throw new Error("Access denied"); }),
                configurable: true,
            });

            expect(() => cookieStorage.set("test", "value", 3600000)).toThrow("CookieStorage error: Access denied");
        });
    });

    describe("delete", () => {
        it("should delete an existing cookie", () => {
            cookieStorage.set("to-delete", "value", 3600000);
            expect(cookieStorage.get("to-delete")).toBe("value");
            
            cookieStorage.delete("to-delete");
            expect(cookieStorage.get("to-delete")).toBeNull();
        });

        it("should not throw when deleting non-existent cookie", () => {
            expect(() => cookieStorage.delete("non-existent")).not.toThrow();
        });

        it("should handle delete with empty key", () => {
            expect(() => cookieStorage.delete("")).not.toThrow();
        });

        it("should not affect other cookies when deleting", () => {
            cookieStorage.set("keep1", "value1", 3600000);
            cookieStorage.set("keep2", "value2", 3600000);
            cookieStorage.set("delete", "value3", 3600000);
            
            cookieStorage.delete("delete");
            
            expect(cookieStorage.get("keep1")).toBe("value1");
            expect(cookieStorage.get("keep2")).toBe("value2");
            expect(cookieStorage.get("delete")).toBeNull();
        });

        it("should throw an error when document.cookie access is denied", () => {
            Object.defineProperty(globalThis.document, "cookie", {
                get: jest.fn(),
                set: jest.fn(() => { throw new Error("Access denied"); }),
                configurable: true,
            });

            expect(() => cookieStorage.delete("test")).toThrow("CookieStorage error: Access denied");
        });

    });

    describe("Integration - multiple operations", () => {
        it("should handle set, get, delete sequence correctly", () => {
            cookieStorage.set("seq1", "first", 3600000);
            expect(cookieStorage.get("seq1")).toBe("first");
            
            cookieStorage.set("seq1", "updated", 3600000);
            expect(cookieStorage.get("seq1")).toBe("updated");
            
            cookieStorage.delete("seq1");
            expect(cookieStorage.get("seq1")).toBeNull();
        });

        it("should handle multiple cookies simultaneously", () => {
            const cookies = [
                { key: "user1", value: "John" },
                { key: "user2", value: "Jane" },
                { key: "user3", value: "Bob" },
                { key: "user4", value: "Alice" },
                { key: "user5", value: "Charlie" }
            ];
            
            cookies.forEach(cookie => {
                cookieStorage.set(cookie.key, cookie.value, 3600000);
            });
            
            cookies.forEach(cookie => {
                expect(cookieStorage.get(cookie.key)).toBe(cookie.value);
            });
            
            // Delete some
            cookieStorage.delete("user2");
            cookieStorage.delete("user4");
            
            expect(cookieStorage.get("user1")).toBe("John");
            expect(cookieStorage.get("user2")).toBeNull();
            expect(cookieStorage.get("user3")).toBe("Bob");
            expect(cookieStorage.get("user4")).toBeNull();
            expect(cookieStorage.get("user5")).toBe("Charlie");
        });
    });
});