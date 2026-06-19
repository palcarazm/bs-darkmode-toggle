import { StorageType } from "../OptionResolver.types";
import { StorageProvider } from "./IStorageProvider";
import { CookieStorage } from "./providers/CookieStorage";
import { LocalStorage } from "./providers/LocalStorage";
import { NoStorage } from "./providers/NoStorage";

export class StorageManager {
    private static readonly STORAGE_KEY = "bs-darkmode-theme";
    private static readonly TTL = 4 * 3600000; // 4 hours in milliseconds
    private provider: StorageProvider;

    constructor(storageType: StorageType) {
        this.provider = this.getProvider(storageType);
    }

    /**
     * Get the storage provider base on requested storage type
     * @param storageType request type of storage
     * @returns A storage provider according to requested storage type
     * @throws Error on storage provider initialization failure
     */
    private getProvider(storageType: StorageType): StorageProvider {
        switch (storageType) {
        case StorageType.COOKIE:
            return new CookieStorage();
        case StorageType.LOCAL:
            return new LocalStorage();
        case StorageType.NONE:
        default:
            return new NoStorage();
        }
    }

    /**
     * Allows to set up a different storage type
     * @param storageType 
     * @throws Error on storage provider initialization failure
     */
    setStorageType(storageType: StorageType): void {
        this.provider = this.getProvider(storageType);
    }

    /**
     * Retrieve the current key stored
     * @returns A string if key is found, `null` otherwise
     * @throws Error on storage provider failure
     */
    get(): string | null {
        return this.provider.get(StorageManager.STORAGE_KEY);
    }

    /**
     * Store the provided value in current storage
     * @param value - The value to store
     * @throws Error on storage provider failure
     */
    set(value: string): void {
        this.provider.set(StorageManager.STORAGE_KEY, value, StorageManager.TTL);
    }

    /**
     * Remove stored value
     * @throws Error on storage provider failure
     */
    delete(): void {
        this.provider.delete(StorageManager.STORAGE_KEY);
    }
}
