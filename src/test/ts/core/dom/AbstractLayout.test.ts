/// <reference types="jest" />
import { AbstractLayout } from "../../../../main/ts/core/dom/AbstractLayout";
import { DarkModeState } from "../../../../main/ts/core/StateReducer.types";
import { TestUtils } from "../../../utils/TestUtils";

class ConcreteLayout extends AbstractLayout {
    public updateControlStateSpy: jest.Mock = jest.fn();
    private control?: HTMLElement;
    
    protected createControl(container: HTMLElement): void {
        const div = document.createElement("div");
        div.id = "control";
        container.appendChild(div);
        this.control = div;
    }
    
    protected updateControlState(state: DarkModeState): void {
        this.updateControlStateSpy(state);
    }
    
    public onChange(_handler: (e: Event) => void): void {
        // Mock implementation
    }
    public destroy(): void {
        if (this.control) this.control.remove();
    }
}

describe("AbstractLayout", () => {
    let container: HTMLElement;
    let root1: HTMLElement;
    let root2: HTMLElement;

    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = "";
        
        container = document.createElement("div");
        document.body.appendChild(container);

        root1 = document.createElement("div");
        root2 = document.createElement("div");

        root1.className = "root";
        root2.className = "root";

        document.body.appendChild(root1);
        document.body.appendChild(root2);
        document.body.appendChild(container);
    });

    function createBuilder() {
        const builder = new ConcreteLayout(container, {...TestUtils.baseOptions, root: ".root"});

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

    describe("roots", () => {
        it("should return all root elements", () => {
            const { builder } = createBuilder();

            expect(builder.roots).toStrictEqual([root1, root2]);
        });
        
        it("should re-query DOM each time (not cached)", () => {
            const { builder } = createBuilder();
            const firstCall = builder.roots;

            const newRoot = document.createElement("div");
            newRoot.className = "root";
            document.body.appendChild(newRoot);

            const secondCall = builder.roots;

            expect(secondCall).not.toBe(firstCall);
            expect(secondCall).toHaveLength(3);
        });
    });

    describe("setState(isLight: boolean)", () => {
        it("should set light mode", () => {
            const { builder } = createBuilder();

            builder.setState({isLight: true, theme: "light"});

            expect(builder.updateControlStateSpy).toHaveBeenCalledTimes(1);
            expect(builder.updateControlStateSpy).toHaveBeenCalledWith({isLight: true, theme: "light"});
        });

        it("should set dark mode", () => {
            const { builder } = createBuilder();

            builder.setState({isLight: false, theme: "dark"});

            expect(builder.updateControlStateSpy).toHaveBeenCalledTimes(1);
            expect(builder.updateControlStateSpy).toHaveBeenCalledWith({isLight: false, theme: "dark"});
        });

        it("should update all root elements", () => {
            const { builder } = createBuilder();

            builder.setState({isLight: true, theme: "light"});

            globalThis.document.querySelectorAll<HTMLElement>(".root").forEach((el) => {
                expect(el.dataset.bsTheme).toBe("light");
            });
        });
    });
});