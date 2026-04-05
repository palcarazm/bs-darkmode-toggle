import { StorageProvider } from "../IStorageProvider";

export class CookieStorage implements StorageProvider {
    get(key: string): string | null {
        const regex = new RegExp("(^| )" + key + "=([^;]+)");
        const match = regex.exec(document.cookie);
        return match ? decodeURIComponent(match[2]) : null;
    }

    set(key: string, value: string, ttl: number): void {
        let expires = "";
        const date = new Date();
        date.setTime(date.getTime() + ttl);
        expires = "; expires=" + date.toUTCString();
        document.cookie = `${key}=${encodeURIComponent(value)}${expires}; path=/`;
    }

    delete(key: string): void {
        document.cookie = `${key}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
}
