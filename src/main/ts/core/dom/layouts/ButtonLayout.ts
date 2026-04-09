import { DarkModeState } from "../../StateReducer.types";
import { AbstractLayout } from "../AbstractLayout";
export class ButtonLayout extends AbstractLayout {
    private _button?: HTMLButtonElement;

    private handler?: (e: Event) => void;

    /**
     * Creates the control element for the layout and appends it to the container.
     * @implements AbstractLayout
     * @param {HTMLElement} container - The container element where the layout will be applied.
     */
    protected createControl(container: HTMLElement): void {
        this.button.type = "button";
        this.button.className = `btn btn-${this.style}`;
        this.button.ariaPressed = "false";
        container.appendChild(this.button);
    }

    /**
     * Lazy initialization getter for the button control element.
     * If the button element is not already created, it will be created using `document.createElement("button")`.
     * @returns {HTMLButtonElement} the button control element.
     */
    private get button(): HTMLButtonElement {
        this._button ??= globalThis.document.createElement("button");
        return this._button;
    }

    /**
     * Update the state of the control element based on the given current state.
     * @implements AbstractLayout
     * @param {DarkModeState} state - The darkmode current state.
     */
    updateControlState({isLight}: DarkModeState): void {
        const label = isLight ? this.lightLabel : this.darkLabel;
        this.button.innerHTML = label;
        
        if (isLight) {
            this.button.classList.add("active");
            this.button.ariaPressed = "true";
        } else {
            this.button.classList.remove("active");
            this.button.ariaPressed = "false";
        }
    }

    /**
     * Attach a callback handler for the control element `change event`.
     * @implements AbstractLayout
     * @param {(e: Event) => void} handler - The callback handler to blink
     */
    onChange(handler: (e: Event) => void): void {
        this.handler = handler;
        this.button.addEventListener("click", handler);
    }

    /**
     * Destroys the layout.
     * If a handler is attached, it will be detached first.
     * Then, the button control element will be removed from the DOM.
     */
    destroy(): void {
        if(this.handler) this.button.removeEventListener("click", this.handler);
        this.handler = undefined;
        this.button.remove();
    }
}