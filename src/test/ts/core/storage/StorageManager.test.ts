import { StorageManager } from "../../../../main/ts/core/storage/StorageManager";
import { StorageType } from "../../../../main/ts/core/OptionResolver.types";
import { CookieStorage } from "../../../../main/ts/core/storage/providers/CookieStorage";
import { LocalStorage } from "../../../../main/ts/core/storage/providers/LocalStorage";
import { NoStorage } from "../../../../main/ts/core/storage/providers/NoStorage";

jest.mock("../../../../main/ts/core/storage/providers/CookieStorage");
jest.mock("../../../../main/ts/core/storage/providers/LocalStorage");
jest.mock("../../../../main/ts/core/storage/providers/NoStorage");

const storageTypes = [StorageType.COOKIE, StorageType.LOCAL, StorageType.NONE];
const storageProviders = [CookieStorage, LocalStorage, NoStorage];

function storageResolver(storageType: StorageType):typeof CookieStorage{
    switch (storageType) {
    case StorageType.COOKIE:
        return CookieStorage;
    case StorageType.LOCAL:
        return LocalStorage;
    case StorageType.NONE:
        return NoStorage;
    }
}

describe("StorageManager", () => {
    let storageManager: StorageManager;
    let mockGet: jest.Mock;
    let mockSet: jest.Mock;
    let mockDelete: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        
        mockGet = jest.fn();
        mockSet = jest.fn();
        mockDelete = jest.fn();
        
        (CookieStorage as jest.Mock).mockImplementation(() => ({
            get: mockGet,
            set: mockSet,
            delete: mockDelete,
        }));
        
        (LocalStorage as jest.Mock).mockImplementation(() => ({
            get: mockGet,
            set: mockSet,
            delete: mockDelete,
        }));
        
        (NoStorage as jest.Mock).mockImplementation(() => ({
            get: mockGet,
            set: mockSet,
            delete: mockDelete,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("constructor", () => {
        it.each(storageTypes)("should create StorageManager with %s storage type", (storage) => {
            storageManager = new StorageManager(storage);
            const wantedProvider = storageResolver(storage);

            expect(wantedProvider).toHaveBeenCalled();

            storageProviders
                .filter((provider) => provider !== wantedProvider)
                .forEach((provider)=> expect(provider).not.toHaveBeenCalled());
        });

        it("should default to NoStorage for unknown storage type", () => {
            // @ts-expect-error - Testing invalid type
            storageManager = new StorageManager("invalid");
            expect(NoStorage).toHaveBeenCalled();
        });
    });

    describe("get", () => {
        beforeEach(() => {
            storageManager = new StorageManager(StorageType.LOCAL);
        });

        it("should return value when provider returns a string", () => {
            mockGet.mockReturnValue("dark");
            const result = storageManager.get();
            expect(result).toBe("dark");
            expect(mockGet).toHaveBeenCalledWith("bs-darkmode-theme");
        });

        it("should return null when provider returns null", () => {
            mockGet.mockReturnValue(null);
            const result = storageManager.get();
            expect(result).toBeNull();
            expect(mockGet).toHaveBeenCalledWith("bs-darkmode-theme");
        });

        it("should return null when provider returns undefined", () => {
            mockGet.mockReturnValue(undefined);
            const result = storageManager.get();
            expect(result).toBeUndefined();
            expect(mockGet).toHaveBeenCalledWith("bs-darkmode-theme");
        });

        it("should return empty string when provider returns empty string", () => {
            mockGet.mockReturnValue("");
            const result = storageManager.get();
            expect(result).toBe("");
            expect(mockGet).toHaveBeenCalledWith("bs-darkmode-theme");
        });

        it.each(storageTypes)("should work with %s provider", (providerType) => {
            storageManager = new StorageManager(providerType);
            mockGet.mockReturnValue("light");
            const result = storageManager.get();
            expect(result).toBe("light");
            expect(mockGet).toHaveBeenCalledWith("bs-darkmode-theme");
        });
    });

    describe("set", () => {
        const TTL = 4 * 3600000; // 4 hours

        beforeEach(() => {
            storageManager = new StorageManager(StorageType.LOCAL);
        });

        it("should call provider.set with correct key, value and TTL", () => {
            storageManager.set("dark");
            expect(mockSet).toHaveBeenCalledWith("bs-darkmode-theme", "dark", TTL);
        });

        it("should call provider.set with light value", () => {
            storageManager.set("light");
            expect(mockSet).toHaveBeenCalledWith("bs-darkmode-theme", "light", TTL);
        });

        it("should call provider.set with custom color mode", () => {
            storageManager.set("custom-blue");
            expect(mockSet).toHaveBeenCalledWith("bs-darkmode-theme", "custom-blue", TTL);
        });

        it.each(storageTypes)("should work with %s provider", (providerType) => {
            storageManager = new StorageManager(providerType);
            storageManager.set("dark");
            expect(mockSet).toHaveBeenCalledWith("bs-darkmode-theme", "dark", TTL);
        });
    });

    describe("delete", () => {
        beforeEach(() => {
            storageManager = new StorageManager(StorageType.LOCAL);
        });

        it("should call provider.delete with correct key", () => {
            storageManager.delete();
            expect(mockDelete).toHaveBeenCalledWith("bs-darkmode-theme");
        });

        it.each(storageTypes)("should work with %s provider", (providerType) => {
            storageManager = new StorageManager(providerType);
            storageManager.delete();
            expect(mockDelete).toHaveBeenCalledWith("bs-darkmode-theme");
        });
    });

    describe("setStorageType", () => {
        beforeEach(() => {
            storageManager = new StorageManager(StorageType.NONE);
        });

        it.each(storageTypes)("should change from NONE to %s provider", (providerType) => {
            storageManager.setStorageType(providerType);
            storageManager.set("dark");

            const wantedProvider = storageResolver(providerType);

            expect(wantedProvider).toHaveBeenCalled();
            expect(mockSet).toHaveBeenCalled();
        });
    });

    describe("Integration - complete workflow", () => {
        it.each(storageTypes)("should handle set, get, delete sequence with %s provider", (providerType) => {
            storageManager = new StorageManager(providerType);
            
            mockGet.mockReturnValue("dark");
            storageManager.set("dark");
            expect(storageManager.get()).toBe("dark");
            
            storageManager.delete();
            mockGet.mockReturnValue(null);
            expect(storageManager.get()).toBeNull();
        });
    });
});