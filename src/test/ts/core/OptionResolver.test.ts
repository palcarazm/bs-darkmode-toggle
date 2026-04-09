/// <reference types="jest" />
import { OptionResolver } from "../../../main/ts/core/OptionResolver";
import { Layout, StorageType, ToggleStyle } from "../../../main/ts/core/OptionResolver.types";
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
            element.dataset.state = "dark";
            const result = OptionResolver.resolve(element);

            expect(result.state).toBe(false);
        });

        it("should use data-state=light", () => {
            element.dataset.state = "light";
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
            element.dataset.root = "#app";

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

    describe("storage resolution", () => {
        const storages = [StorageType.COOKIE, StorageType.LOCAL, StorageType.NONE];
        it.each(storages)("should enable storage via attribute when storage is %s", (storage) => {
            element.dataset.storage = storage;

            const result = OptionResolver.resolve(element);

            expect(result.storage).toBe(storage);
        });

        it.each(storages)("should enable storage via options when storage is %s", (storage) => {
            delete element.dataset.storage;
            const result = OptionResolver.resolve(element, { storage: storage });

            expect(result.storage).toBe(storage);
        });

        it("should fallback storage to default", () => {
            delete element.dataset.storage;
            const result = OptionResolver.resolve(element);

            expect(result.storage).toBe(StorageType.NONE);
        });
    });

    describe("label resolution", () => {
        it("should resolve light and dark Label from data", () => {
            element.dataset.lightLabel = "<b>Light</b>";
            element.dataset.darkLabel = "<b>Dark</b>";

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

            expect(result.lightLabel).toBe("<i class=\"bs-darkmode-toggle sun\"></i>");
            expect(result.darkLabel).toBe("<i class=\"bs-darkmode-toggle moon\"></i>");
        });
    });

    describe("color mode resolution", () => {
        it("should resolve light and dark ColorMode from data", () => {
            element.dataset.lightColorMode = "custom-light";
            element.dataset.darkColorMode = "custom-dark";

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
        const btnStyles: ToggleStyle[] = [
            "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link",
            "outline-primary", "outline-secondary", "outline-success", "outline-danger", "outline-warning", "outline-info", "outline-light", "outline-dark"
        ];

        it.each(btnStyles)("should resolve %s style from data", (style) => {
            element.dataset.style = `${style}`;

            const result = OptionResolver.resolve(element);

            expect(result.style).toBe(`${style}`);
        });

        it.each(btnStyles)("should resolve %s style from options", (style) => {
            const result = OptionResolver.resolve(element, {
                style: style,
            });

            expect(result.style).toBe(style);
        });

        it("should fallback style to defaults", () => {
            const result = OptionResolver.resolve(element);

            expect(result.style).toBe("outline-secondary");
        });
    }); 

    describe("layout resolution", () => {
        const layouts = [Layout.BUTTON, Layout.TOGGLE];
        it.each(layouts)("should enable layout via attribute when storage is %s", (layout) => {
            element.dataset.layout = layout;

            const result = OptionResolver.resolve(element);

            expect(result.layout).toBe(layout);
        });

        it.each(layouts)("should enable layout via options when layout is %s", (layout) => {
            delete element.dataset.layout;
            const result = OptionResolver.resolve(element, { layout: layout });

            expect(result.layout).toBe(layout);
        });

        it("should fallback layout to default", () => {
            delete element.dataset.layout;
            const result = OptionResolver.resolve(element);

            expect(result.layout).toBe(Layout.TOGGLE);
        });
    });

    describe("Aria Label resolution", () => {
        it("should resolve Aria Label from attributes", () => {
            element.dataset.lightAriaLabel = "custom-light";
            element.dataset.darkAriaLabel = "custom-dark";

            const result = OptionResolver.resolve(element);

            expect(result.lightAriaLabel).toBe("custom-light");
            expect(sanitizeSpy).toHaveBeenCalledWith("custom-light", { mode: "TEXT" });

            expect(result.darkAriaLabel).toBe("custom-dark");
            expect(sanitizeSpy).toHaveBeenCalledWith("custom-dark", { mode: "TEXT" });
        });

        it("should resolve Aria Label from options", () => {
            const result = OptionResolver.resolve(element, {
                lightAriaLabel: "custom-light",
                darkAriaLabel: "custom-dark",
            });

            expect(result.lightAriaLabel).toBe("custom-light");
            expect(result.darkAriaLabel).toBe("custom-dark");
        });

        it("should fallback Aria Label to defaults", () => {
            const result = OptionResolver.resolve(element);

            expect(result.lightAriaLabel).toBe("Switch to dark mode");
            expect(result.darkAriaLabel).toBe("Switch to light mode");
        });
    });
});