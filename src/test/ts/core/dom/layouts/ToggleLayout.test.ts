/// <reference types="jest" />
import { BootstrapToggleElement, Methods } from "bootstrap5-toggle";
import { ToggleLayout } from "../../../../../main/ts/core/dom/layouts/ToggleLayout";
import { Layout, ResolvedOptions } from "../../../../../main/ts/core/OptionResolver.types";
import { TestUtils } from "../../../../utils/TestUtils";

const isAttachedMock = jest.fn();
const onceMock = jest.fn();

Object.defineProperty(HTMLInputElement.prototype, "bootstrapToggle", {
    value: jest.fn(),
    writable: true,
});
Object.defineProperty(HTMLInputElement.prototype, "bsToggle", {
    value: {
        isAttached: isAttachedMock,
        once: onceMock,
    },
    writable: true,
});

const options: ResolvedOptions = {...TestUtils.baseOptions, root: ".root", layout: Layout.TOGGLE};

describe("ToggleLayout", () => {
    const bsToggleSpy = jest.spyOn(HTMLInputElement.prototype as BootstrapToggleElement, "bootstrapToggle").mockImplementation(() => {});
    let container: HTMLElement;
    let root1: HTMLElement;
    let root2: HTMLElement;

    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = "";

        container = document.createElement("div");

        root1 = document.createElement("div");
        root2 = document.createElement("div");

        root1.className = "root";
        root2.className = "root";

        document.body.appendChild(root1);
        document.body.appendChild(root2);
        document.body.appendChild(container);
    });

    function createBuilder() {
        const builder = new ToggleLayout(container, options);

        const control = container.querySelector("input") as BootstrapToggleElement;

        return { builder, control };
    }

    describe("constructor", () => {
        it("should clear container and create control", () => {
            container.innerHTML = "<span>old</span>";

            const { control } = createBuilder();

            expect(container.innerHTML).not.toContain("old");
            expect(control).toBeInstanceOf(HTMLInputElement);
            expect(control.type).toBe("checkbox");
        });

        it("should call bootstrapToggle with correct options", () => {
            const _instance = createBuilder();

            expect(bsToggleSpy).toHaveBeenCalledWith({
                onlabel: options.lightLabel,
                offlabel: options.darkLabel,
                onstyle: options.style,
                offstyle: options.style,
            });
        });
    });

    describe("setState(isLight: boolean)", () => {
        it("should set light mode when toggle is attached", () => {
            isAttachedMock.mockReturnValueOnce(true);
            const { builder } = createBuilder();

            builder.setState({isLight: true, theme: "light"});

            expect(bsToggleSpy).toHaveBeenCalledWith(Methods.ON, true);

            expect(root1.dataset.bsTheme).toBe("light");
            expect(root2.dataset.bsTheme).toBe("light");
        });

        it("should set ARIA attributes and rerender when light mode is sets when toggle is attached", () => {
            isAttachedMock.mockReturnValueOnce(true);
            const { builder, control } = createBuilder();

            builder.setState({isLight: true, theme: "light"});
            
            expect(control.ariaLabel).toBe(options.lightAriaLabel);
            expect(bsToggleSpy).toHaveBeenCalledWith(Methods.RERENDER);
        });

        it("should set dark mode when toggle is attached", () => {
            isAttachedMock.mockReturnValueOnce(true);
            const { builder } = createBuilder();

            builder.setState({isLight: false, theme: "dark"});

            expect(bsToggleSpy).toHaveBeenCalledWith(Methods.OFF, true);

            expect(root1.dataset.bsTheme).toBe("dark");
            expect(root2.dataset.bsTheme).toBe("dark");
        });

        it("should set ARIA attributes and rerender when dark mode is sets when toggle is attached", () => {
            isAttachedMock.mockReturnValueOnce(true);
            const { builder, control } = createBuilder();

            builder.setState({isLight: false, theme: "dark"});
            
            expect(control.ariaLabel).toBe(options.darkAriaLabel);
            expect(bsToggleSpy).toHaveBeenCalledWith(Methods.RERENDER);
        });

        it("should update all root elements", () => {
            const { builder } = createBuilder();

            builder.setState({isLight: true, theme: "light"});

            globalThis.document.querySelectorAll<HTMLElement>(".root").forEach((el) => {
                expect(el.dataset.bsTheme).toBe("light");
            });
        });

        it("should not rerender Bootstrap Toggle if ariaLabel hasn't changed when toggle is attached", () => {
            isAttachedMock.mockReturnValueOnce(true);
            const { builder } = createBuilder();

            builder.setState({isLight: false, theme: "dark"});
            bsToggleSpy.mockClear();
            builder.setState({isLight: false, theme: "dark"});

            expect(bsToggleSpy).not.toHaveBeenCalledWith(Methods.RERENDER);
        });

        it("should wait since toggle is attached", () => {
            isAttachedMock.mockReturnValueOnce(false);
            const { builder } = createBuilder();

            builder.setState({isLight: true, theme: "light"});

            expect(onceMock).toHaveBeenCalledWith("toggle:attached", expect.any(Function));
        });
    });

    describe("onChange(handler: (e: Event) => void)", () => {
        it("should attach change listener", () => {
            const { builder, control } = createBuilder();

            const handler = jest.fn();

            builder.onChange(handler);

            control.dispatchEvent(new Event("change"));

            expect(handler).toHaveBeenCalled();
        });
    });

    describe("onChange()", () => {
        const handler = jest.fn();

        it("should trigger onChange handler on input change event", () => {
            const { builder, control } = createBuilder();
            
            builder.onChange(handler);
            
            control.dispatchEvent(new Event("change"));
            
            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(expect.any(Event));
            expect(handler).toHaveBeenCalledWith(expect.objectContaining({ type: "change" }));
        });

        it("should pass the correct event object to handler", () => {
            const { builder, control } = createBuilder();
            
            builder.onChange(handler);
            
            const changeEvent = new Event("change", { bubbles: true });
            control.dispatchEvent(changeEvent);
            
            expect(handler).toHaveBeenCalledWith(changeEvent);
        });

        it("should handle multiple onChange handlers", () => {
            const { builder, control } = createBuilder();
            const handler1 = jest.fn();
            const handler2 = jest.fn();
            
            builder.onChange(handler1);
            builder.onChange(handler2);
            
            control.dispatchEvent(new Event("change"));
            
            expect(handler1).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
        });
    });

    describe("destroy()", () => {
        it("should destroy toggle and remove control", () => {
            const { builder, control } = createBuilder();
            builder.destroy();
            expect (bsToggleSpy).toHaveBeenCalledWith(Methods.DESTROY);
            expect(container.contains(control)).toBeFalsy();
        });

        it("should remove event listeners", () => {
            const { builder, control } = createBuilder();
            const handler = jest.fn();
            builder.onChange(handler);
            builder.destroy();
            control.dispatchEvent(new Event("change"));
            expect(handler).not.toHaveBeenCalled();
        });
    });
});