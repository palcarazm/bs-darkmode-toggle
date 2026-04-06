/// <reference types="jest" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractLayout } from "../../../../main/ts/core/dom/AbstractLayout";
import { ResolvedOptions, StorageType, Layout } from "../../../../main/ts/core/OptionResolver.types";

class ConcreteLayout extends AbstractLayout {
    public updateControlStateSpy: jest.Mock = jest.fn();
    
    protected createControl(container: HTMLElement): void {
        const div = document.createElement("div");
        div.id = "control";
        container.appendChild(div);
    }
    
    protected updateControlState(isLight: boolean): void {
        this.updateControlStateSpy(isLight);
    }
    
    public onChange(_handler: (e: Event) => void): void {
        // Mock implementation
    }
}

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

describe("AbstractLayout", () => {
    let container: HTMLElement;
    let root1: HTMLElement;
    let root2: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        jest.clearAllMocks();

        root1 = document.createElement("div");
        root2 = document.createElement("div");

        root1.className = "root";
        root2.className = "root";

        document.body.appendChild(root1);
        document.body.appendChild(root2);
        document.body.appendChild(container);
    });

    function createBuilder() {
        const builder = new ConcreteLayout(container, options);

        const control = container.querySelector("#control") as HTMLElement;

        return { builder, control };
    }

    describe("constructor", () => {
        it("should clear container and create control", () => {
            container.innerHTML = "<span>old</span>";

            const { control } = createBuilder();

            expect(container.innerHTML).not.toContain("old");
            expect(control).toBeInstanceOf(HTMLElement);
        });
    });

    describe("setState(isLight: boolean)", () => {
        it("should set light mode", () => {
            const { builder } = createBuilder();

            builder.setState(true);

            expect(builder.updateControlStateSpy).toHaveBeenCalledTimes(1);
            expect(builder.updateControlStateSpy).toHaveBeenCalledWith(true);
        });

        it("should set dark mode", () => {
            const { builder } = createBuilder();

            builder.setState(false);

            expect(builder.updateControlStateSpy).toHaveBeenCalledTimes(1);
            expect(builder.updateControlStateSpy).toHaveBeenCalledWith(false);
        });

        it("should update all root elements", () => {
            const { builder } = createBuilder();

            builder.setState(true);

            globalThis.document.querySelectorAll<HTMLElement>(".root").forEach((el) => {
                expect(el.dataset.bsTheme).toBe("light");
            });
        });
    });
});