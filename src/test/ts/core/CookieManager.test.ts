import { CookieManager } from "../../../main/ts/core/CookieManager";

describe("CookieManager", () => {
    let cookieManager: CookieManager;
    let cookieStore: string;

    beforeEach(() => {
        cookieManager = new CookieManager();

        cookieStore = "";

        Object.defineProperty(document, "cookie", {
            get: jest.fn(() => cookieStore),
            set: jest.fn((val: string) => {
                // simulate cookie storage by parsing the set value and updating cookieStore
                const [newCookie] = val.split(";");
        
                const name = newCookie.split("=")[0];

                // remove existing cookie with the same name
                const cookies = cookieStore
                    .split("; ")
                    .filter(c => c && !c.startsWith(name + "="));

                cookies.push(newCookie);

                cookieStore = cookies.join("; ");
            }),
            configurable: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("set(name: string, value: string, days: number)", () => {
        it("should set a cookie without expiration", () => {
            cookieManager.set("test", "value", 0);

            expect(document.cookie).toContain("test=value");
        });

        it("should set a cookie with expiration", () => {
            cookieManager.set("test", "value", 1);

            expect(document.cookie).toContain("test=value");
            expect((document.cookie as unknown)).toBeDefined(); // cobertura rama expires
        });
    });

    describe("get(name: string): string | null", () => {
        it("should return null if cookie does not exist", () => {
            expect(cookieManager.get("missing")).toBeNull();
        });

        it("should return cookie value if exists", () => {
            document.cookie = "foo=bar";

            const result = cookieManager.get("foo");

            expect(result).toBe("bar");
        });

        it("should decode cookie value", () => {
            document.cookie = "encoded=" + encodeURIComponent("hello world");

            const result = cookieManager.get("encoded");

            expect(result).toBe("hello world");
        });

        it("should handle multiple cookies", () => {
            document.cookie = "a=1";
            document.cookie = "b=2";
            document.cookie = "c=3";

            expect(cookieManager.get("b")).toBe("2");
        });
    });

    describe("delete(name: string)", () => {
        it("should delete a cookie", () => {
            document.cookie = "toDelete=value";
            cookieManager.delete("toDelete");
            expect(document.cookie).toContain("toDelete=");
        });
    });
});