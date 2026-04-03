import { OptionResolver } from "../../../main/ts/core/OptionResolver";
import * as Tools from "../../../main/ts/core/Tools";

describe("OptionResolver", () => {
    const sanitizeSpy = jest.spyOn(Tools, "sanitize");
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement("div");
        jest.clearAllMocks();
    });

    describe("state resolution", () => {
        it("should use data-state=dark", () => {
            element.setAttribute("data-state", "dark");

            const result = OptionResolver.resolve(element);

            expect(result.state).toBe(false);
        });

        it("should use data-state=light", () => {
            element.setAttribute("data-state", "light");

            const result = OptionResolver.resolve(element);

            expect(result.state).toBe(true);
        });

        it("should fallback to options.state", () => {
            const result = OptionResolver.resolve(element, { state: false });

            expect(result.state).toBe(false);
        });

        it("should fallback to default state", () => {
            const result = OptionResolver.resolve(element);

            expect(result.state).toBe(true);
        });
    });

    describe("root resolution", () => {
        it("should use data-root", () => {
            element.setAttribute("data-root", "#app");

            const result = OptionResolver.resolve(element);

            expect(result.root).toBe("#app");
            expect(sanitizeSpy).toHaveBeenCalledWith("#app", { mode: Tools.SanitizeMode.TEXT });
        });

        it("should fallback to options.root", () => {
            const result = OptionResolver.resolve(element, { root: "#opt" });

            expect(result.root).toBe("#opt");
        });

        it("should fallback to default root", () => {
            const result = OptionResolver.resolve(element);

            expect(result.root).toBe(":root");
        });
    });

    describe("allowCookie resolution", () => {
        it("should enable allowCookie via attribute", () => {
            element.setAttribute("data-allowCookie", "");

            const result = OptionResolver.resolve(element);

            expect(result.allowCookie).toBe(true);
        });

        it("should enable allowCookie via options", () => {
            const result = OptionResolver.resolve(element, { allowCookie: true });

            expect(result.allowCookie).toBe(true);
        });

        it("should fallback allowCookie to default", () => {
            const result = OptionResolver.resolve(element);

            expect(result.allowCookie).toBe(false);
        });
    });

    describe("label resolution", () => {
        it("should resolve light and dark Label from data", () => {
            element.setAttribute("data-lightLabel", "<b>Light</b>");
            element.setAttribute("data-darkLabel", "<b>Dark</b>");

            const result = OptionResolver.resolve(element);

            expect(result.lightLabel).toBe("<b>Light</b>");
            expect(sanitizeSpy).toHaveBeenCalledWith("<b>Light</b>", { mode: Tools.SanitizeMode.HTML });

            expect(result.darkLabel).toBe("<b>Dark</b>");
            expect(sanitizeSpy).toHaveBeenCalledWith("<b>Dark</b>", { mode: Tools.SanitizeMode.HTML });
        });

        it("should resolve light and dark Label from options", () => {
            const result = OptionResolver.resolve(element, {
                lightLabel: "<i>Light</i>",
                darkLabel: "<i>Dark</i>",
            });

            expect(result.lightLabel).toBe("<i>Light</i>");
            expect(result.darkLabel).toBe("<i>Dark</i>");
        });

        it("should fallback labels to defaults", () => {
            const result = OptionResolver.resolve(element);

            expect(result.lightLabel).toBe("Light");
            expect(result.darkLabel).toBe("Dark");
        });
    });

    describe("color mode resolution", () => {
        it("should resolve light and dark ColorMode from data", () => {
            element.setAttribute("data-lightColorMode", "custom-light");
            element.setAttribute("data-darkColorMode", "custom-dark");

            const result = OptionResolver.resolve(element);

            expect(result.lightColorMode).toBe("custom-light");
            expect(sanitizeSpy).toHaveBeenCalledWith("custom-light", { mode: "TEXT" });

            expect(result.darkColorMode).toBe("custom-dark");
            expect(sanitizeSpy).toHaveBeenCalledWith("custom-dark", { mode: "TEXT" });
        });

        it("should resolve light and dark ColorMode from options", () => {
            const result = OptionResolver.resolve(element, {
                lightColorMode: "custom-light",
                darkColorMode: "custom-dark",
            });

            expect(result.lightColorMode).toBe("custom-light");
            expect(result.darkColorMode).toBe("custom-dark");
        });

        it("should fallback color modes to defaults", () => {
            const result = OptionResolver.resolve(element);

            expect(result.lightColorMode).toBe("light");
            expect(result.darkColorMode).toBe("dark");
        });
    });

    describe("style resolution", () => {
        it("should always use default style", () => {
            const result = OptionResolver.resolve(element, {
                style: "ignored",
            });

            expect(result.style).toBe("outline-secondary");
        });
    }); 
});