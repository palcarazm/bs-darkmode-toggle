import { StorageProvider } from "../IStorageProvider";

export class NoStorage implements StorageProvider {
    get(_key: string): string | null {
        return null;
    }
    set(_key: string, _value: string, _ttl: number): void {
        // Do nothing
    }
    delete(_key: string): void {
        // Do nothing
    }
}
