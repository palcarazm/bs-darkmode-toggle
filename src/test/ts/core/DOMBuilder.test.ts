import { DOMBuilder, BootstrapToggleElement, BootstrapToggleMethods} from "../../../main/ts/core/DOMBuilder";
import { ResolvedOptions } from "../../../main/ts/core/OptionResolver.types";

Object.defineProperty(HTMLInputElement.prototype, "bootstrapToggle", {
    value: jest.fn(),
    writable: true,
});

describe("DOMBuilder", () => {
    const bsToggleSpy = jest.spyOn(HTMLInputElement.prototype as BootstrapToggleElement, "bootstrapToggle").mockImplementation(() => {});
    let container: HTMLElement;
    let root1: HTMLElement;
    let root2: HTMLElement;

    const options: ResolvedOptions = {
        state: true,
        root: ".root",
        allowCookie: false,
        lightLabel: "Light",
        darkLabel: "Dark",
        lightColorMode: "light",
        darkColorMode: "dark",
        style: "outline",
    };

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
        const builder = new DOMBuilder(container, options);

        const input = container.querySelector("input") as BootstrapToggleElement;

        return { builder, input };
    }

    describe("constructor", () => {
        it("should clear container and create input", () => {
            container.innerHTML = "<span>old</span>";

            const { input } = createBuilder();

            expect(container.innerHTML).not.toContain("old");
            expect(input).toBeInstanceOf(HTMLInputElement);
            expect(input.type).toBe("checkbox");
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

            builder.setState(true);

            expect(bsToggleSpy).toHaveBeenCalledWith(BootstrapToggleMethods.ON, true);

            expect(root1.dataset.bsTheme).toBe("light");
            expect(root2.dataset.bsTheme).toBe("light");
        });

        it("should set dark mode", () => {
            const { builder } = createBuilder();

            builder.setState(false);

            expect(bsToggleSpy).toHaveBeenCalledWith(BootstrapToggleMethods.OFF, true);

            expect(root1.dataset.bsTheme).toBe("dark");
            expect(root2.dataset.bsTheme).toBe("dark");
        });

        it("should update all root elements", () => {
            const { builder } = createBuilder();

            builder.setState(true);

            document.querySelectorAll<HTMLElement>(".root").forEach((el) => {
                expect(el.dataset.bsTheme).toBe("light");
            });
        });
    });

    describe("onChange(handler: (e: Event) => void)", () => {
        it("should attach change listener", () => {
            const { builder, input } = createBuilder();

            const handler = jest.fn();

            builder.onChange(handler);

            input.dispatchEvent(new Event("change"));

            expect(handler).toHaveBeenCalled();
        });
    });
});