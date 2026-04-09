import { ButtonLayout} from "../../../../../main/ts/core/dom/layouts/ButtonLayout";
import { Layout, ResolvedOptions, StorageType } from "../../../../../main/ts/core/OptionResolver.types";

const options: ResolvedOptions = {
    state: true,
    root: ".root",
    storage: StorageType.NONE,
    lightLabel: "Light",
    darkLabel: "Dark",
    lightColorMode: "light",
    darkColorMode: "dark",
    style: "outline-secondary",
    layout: Layout.BUTTON,
};

describe("ButtonLayout", () => {
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
        const builder = new ButtonLayout(container, options);

        const control = container.querySelector("button") as HTMLButtonElement;

        return { builder, control };
    }

    describe("constructor", () => {
        it("should clear container and create control", () => {
            container.innerHTML = "<span>old</span>";

            const { control } = createBuilder();

            expect(container.innerHTML).not.toContain("old");
            expect(control).toBeInstanceOf(HTMLButtonElement);
            expect(control.type).toBe("button");
            expect(control.className).toBe(`btn btn-${options.style}`);
            expect(control.ariaPressed).toBe("false");
        });
    });

    describe("setState(isLight: boolean)", () => {
        it("should set light mode", () => {
            const { builder, control } = createBuilder();

            builder.setState({isLight: true, theme: "light"});

            expect(control.className).toContain("active");
            expect(control.ariaPressed).toBe("true");

            expect(root1.dataset.bsTheme).toBe("light");
            expect(root2.dataset.bsTheme).toBe("light");
        });

        it("should set dark mode", () => {
            const { builder, control } = createBuilder();

            builder.setState({isLight: false, theme: "dark"});

            expect(control.className).not.toContain("active");
            expect(control.ariaPressed).toBe("false");

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
        it("should attach click listener", () => {
            const { builder, control } = createBuilder();

            const handler = jest.fn();

            builder.onChange(handler);

            control.dispatchEvent(new Event("click"));

            expect(handler).toHaveBeenCalled();
        });
    });

    describe("onChange()", () => {
        const handler = jest.fn();
        it("should trigger onChange handler on button click", () => {
            const { builder, control } = createBuilder();
            
            builder.onChange(handler);
            
            control.dispatchEvent(new Event("click"));
            
            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(expect.any(Event));
            expect(handler).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
        });

        it("should pass the correct event object to handler", () => {
            const { builder, control } = createBuilder();
            
            builder.onChange(handler);
            
            const clickEvent = new MouseEvent("click", { bubbles: true });
            control.dispatchEvent(clickEvent);
            
            expect(handler).toHaveBeenCalledWith(clickEvent);
        });

        it("should handle multiple onChange handlers", () => {
            const { builder, control } = createBuilder();
            const handler1 = jest.fn();
            const handler2 = jest.fn();
            
            builder.onChange(handler1);
            builder.onChange(handler2);
            
            control.dispatchEvent(new Event("click"));
            
            expect(handler1).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
        });
    });

    describe("destroy()", () => {
        it("should remove control", () => {
            const { builder, control } = createBuilder();
            builder.destroy();
            expect(container.contains(control)).toBeFalsy();
        });

        it("should remove event listeners", () => {
            const { builder, control } = createBuilder();
            const handler = jest.fn();
            builder.onChange(handler);
            builder.destroy();
            control.dispatchEvent(new Event("click"));
            expect(handler).not.toHaveBeenCalled();
        });
    });
});