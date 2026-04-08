import { ToggleLayout, BootstrapToggleElement, BootstrapToggleMethods} from "../../../../../main/ts/core/dom/layouts/ToggleLayout";
import { Layout, ResolvedOptions, StorageType } from "../../../../../main/ts/core/OptionResolver.types";

Object.defineProperty(HTMLInputElement.prototype, "bootstrapToggle", {
    value: jest.fn(),
    writable: true,
});

const options: ResolvedOptions = {
    state: true,
    root: ".root",
    storage: StorageType.NONE,
    lightLabel: "Light",
    darkLabel: "Dark",
    lightColorMode: "light",
    darkColorMode: "dark",
    style: "outline-secondary",
    layout: Layout.TOGGLE,
};

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
        it("should set light mode", () => {
            const { builder } = createBuilder();

            builder.setState({isLight: true, theme: "light"});

            expect(bsToggleSpy).toHaveBeenCalledWith(BootstrapToggleMethods.ON, true);

            expect(root1.dataset.bsTheme).toBe("light");
            expect(root2.dataset.bsTheme).toBe("light");
        });

        it("should set dark mode", () => {
            const { builder } = createBuilder();

            builder.setState({isLight: false, theme: "dark"});

            expect(bsToggleSpy).toHaveBeenCalledWith(BootstrapToggleMethods.OFF, true);

            expect(root1.dataset.bsTheme).toBe("dark");
            expect(root2.dataset.bsTheme).toBe("dark");
        });

        it("should update all root elements", () => {
            const { builder } = createBuilder();

            builder.setState({isLight: true, theme: "light"});

            globalThis.document.querySelectorAll<HTMLElement>(".root").forEach((el) => {
                expect(el.dataset.bsTheme).toBe("light");
            });
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
});