export class CookieManager {
    set(name: string, value: string, days: number) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 86400000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    }

    get(name: string): string | null {
        const regex = new RegExp("(^| )" + name + "=([^;]+)");
        const match = regex.exec(document.cookie);
        return match ? decodeURIComponent(match[2]) : null;
    }

    delete(name: string) {
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    }
}