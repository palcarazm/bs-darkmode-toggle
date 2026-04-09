import { BootstrapToggleElement, Methods } from "bootstrap5-toggle";
import { DarkModeState } from "../../StateReducer.types";
import { AbstractLayout } from "../AbstractLayout";

export class ToggleLayout extends AbstractLayout {
    private _input?: BootstrapToggleElement;
    private handler?: (e: Event) => void;

    /**
     * Create a Bootstrap Toggle control in the given container.
     * @implements AbstractLayout
     * @param container the container for the control
     */
    protected createControl(container: HTMLElement): void {
        this.input.type = "checkbox";
        container.appendChild(this.input);

        this.input.bootstrapToggle({
            onlabel: this.lightLabel,
            offlabel: this.darkLabel,
            onstyle: this.style,
            offstyle: this.style,
        });
    }

    /**
     * Lazy initialization getter for the input control element.
     * If the input element is not already created, it will be created using `document.createElement("input")`.
     * @returns {BootstrapToggleElement} the button control element.
     */
    private get input(): BootstrapToggleElement {
        this._input ??= globalThis.document.createElement("input") as BootstrapToggleElement;
        return this._input;
    }

    /**
     * Update the state of the control element based on the given current state.
     * 
     * Implementation note: for performance reasons, rerender is only called if the ariaLabel has changed.
     * @implements AbstractLayout
     * @param {DarkModeState} state - The darkmode current state.
     */
    updateControlState({isLight}: DarkModeState) {
        const newAriaLabel = this.getAriaLabel(isLight);
        if (newAriaLabel !== this.input.ariaLabel) {
            this.input.ariaLabel = newAriaLabel;
            this.input.bootstrapToggle(Methods.RERENDER);
        }
        this.input.bootstrapToggle(
            isLight ? Methods.ON : Methods.OFF,
            true
        );
    }

    /**
     * Attach a callback handler for the control element `change event`.
     * @implements AbstractLayout
     * @param {(e: Event) => void} handler - The callback handler to blink
     */
    onChange(handler: (e: Event) => void) {
        this.handler = handler;
        this.input.addEventListener("change", handler);
    }

    /**
     * Destroys the layout and removes any event listeners attached to the control element.
     */
    destroy(): void {
        if(this.handler) this.input.removeEventListener("change", this.handler);
        this.handler = undefined;
        this.input.bootstrapToggle(Methods.DESTROY);
        this.input.remove();
    }
}
