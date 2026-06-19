import { StorageProvider } from "../IStorageProvider";

export class CookieStorage implements StorageProvider {
    /**
     * Retrieves a value from cookie storage.
     * @param {string} key The key of the record to retrieve.
     * @returns {string | null} The value associated with the key, or `null` if not found.
     * @throws {Error} If cookie storage is unavailable or access is denied.
     */
    get(key: string): string | null {
        try {
            const regex = new RegExp("(^| )" + key + "=([^;]+)");
            const match = regex.exec(document.cookie);
            return match ? decodeURIComponent(match[2]) : null;
        } catch (error) {
            throw new Error(`CookieStorage error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Sets a value in cookie storage.
     * @param {string} key The key of the record to set.
     * @param {string} value The value to set for the record.
     * @param {number} ttl The time-to-live for the record.
     * @throws {Error} If cookie storage is unavailable or access is denied.
     */
    set(key: string, value: string, ttl: number): void {
        try {
            let expires = "";
            const date = new Date();
            date.setTime(date.getTime() + ttl);
            expires = "; expires=" + date.toUTCString();
            document.cookie = `${key}=${encodeURIComponent(value)}${expires}; path=/`;
        } catch (error) {
            throw new Error(`CookieStorage error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Deletes a value from cookie storage.
     * @param {string} key The key of the record to delete.
     * @throws {Error} If cookie storage is unavailable or access is denied.
     */
    delete(key: string): void {
        try {
            document.cookie = `${key}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        } catch (error) {
            throw new Error(`CookieStorage error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
