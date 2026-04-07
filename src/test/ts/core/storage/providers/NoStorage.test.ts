import { NoStorage } from "../../../../../main/ts/core/storage/providers/NoStorage";

describe("NoStorage", () => {
    let noStorage: NoStorage;

    beforeEach(() => {
        noStorage = new NoStorage();
    });

    describe("get", () => {
        it("should always return null regardless of key", () => {
            const result = noStorage.get("any-key");
            expect(result).toBeNull();
        });
    });

    describe("set", () => {
        it("should not throw when setting a value", () => {
            expect(() => noStorage.set("key", "value", 3600000)).not.toThrow();
        });
    });

    describe("delete", () => {
        it("should not throw when deleting a key", () => {
            expect(() => noStorage.delete("key")).not.toThrow();
        });
    });
});