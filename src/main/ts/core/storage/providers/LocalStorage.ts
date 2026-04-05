import { StorageProvider } from "../IStorageProvider";

export class LocalStorage implements StorageProvider {
    get(key: string): string | null {
        try {
            return globalThis.localStorage?.getItem(key) || null;
        } catch (error) {
            console.warn("Unable to access localStorage:", error);
            return null;
        }
    }

    set(key: string, value: string, _ttl: number): void {
        try {
            globalThis.localStorage?.setItem(key, value);
        } catch (error) {
            console.warn("Unable to write to localStorage:", error);
        }
    }

    delete(key: string): void {
        try {
            globalThis.localStorage?.removeItem(key);
        } catch (error) {
            console.warn("Unable to remove from localStorage:", error);
        }
    }
}
