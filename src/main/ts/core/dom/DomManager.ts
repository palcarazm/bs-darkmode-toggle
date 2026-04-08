import { Layout, ResolvedOptions } from "../OptionResolver.types";
import { DarkModeState } from "../StateReducer.types";
import { AbstractLayout } from "./AbstractLayout";
import { ButtonLayout } from "./layouts/ButtonLayout";
import { ToggleLayout } from "./layouts/ToggleLayout";

/**
 * The DOMManager class is responsible for updating the DOM to reflect the current state of the control.
 * It delegates the task to the layout implementation being a facade.
 */
export class DomManager{
    private readonly layout: AbstractLayout;

    /**
     * Constructs an instance of DOMManager with the given container, options, and onChange handler.
     * @param {HTMLElement} container - The container element where the layout will be applied.
     * @param {ResolvedOptions} options - The resolved options to apply to the layout.
     * @param {(e: Event) => void} onChange - The callback handler for the control element `change event`.
     */
    constructor(container: HTMLElement, options: ResolvedOptions, onChange: (e: Event) => void) {
        switch (options.layout) {
        case Layout.TOGGLE:
            this.layout = new ToggleLayout(container, options);
            break;
        case Layout.BUTTON:
            this.layout = new ButtonLayout(container, options);
            break;
        default:
            this.layout = new ToggleLayout(container, options);
            break;
        }

        this.layout.onChange(onChange);
    }

    /**
     * Updated DOM to current state by delegating to the layout.
     * @param {DarkModeState} state - The darkmode current state.
     */
    public setState(state: DarkModeState): void{
        this.layout.setState(state);
    }

    /**
     * Returns the root elements by delegating to the layout.
     * @returns {HTMLElement[]} The root elements.
     */
    public get roots(): HTMLElement[] {
        return this.layout.roots;
    }
}