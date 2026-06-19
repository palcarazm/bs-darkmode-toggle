import { StorageProvider } from "../IStorageProvider";

export class LocalStorage implements StorageProvider {

    /**
     * Retrieves a value from localStorage.
     * @param {string} key The key of the record to retrieve from localStorage.
     * @returns {string | null} The value associated with the key, or `null` if not found or if localStorage is unavailable.
     * @throws {Error} If localStorage is unavailable or access is denied.
     */
    get(key: string): string | null {
        return globalThis.localStorage?.getItem(key) || null;
    }

    /**
     * Sets a value in localStorage.
     * @param {string} key The key of the record to set in localStorage.
     * @param {string} value The value to set for the record.
     * @param {number} _ttl The time-to-live for the record (not used in this implementation).
     * @throws {Error} If localStorage is unavailable or access is denied.
     */
    set(key: string, value: string, _ttl: number): void {
        globalThis.localStorage?.setItem(key, value);
    }

    /**
     * Deletes a value from localStorage.
     * @param {string} key The key of the record to delete from localStorage.
     * @throws {Error} If localStorage is unavailable or access is denied.
     */
    delete(key: string): void {
        globalThis.localStorage?.removeItem(key);
    }
}
