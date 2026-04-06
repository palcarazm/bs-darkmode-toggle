import { AbstractLayout } from "../AbstractLayout";
export class ButtonLayout extends AbstractLayout {
    private _button?: HTMLButtonElement;

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
     * Update the state of the control element based on the given boolean.
     * @implements AbstractLayout
     * @param {boolean} isLight - A boolean indicating whether to set light mode (`true`) or dark mode (`false`)
     */
    updateControlState(isLight: boolean): void {
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
        this.button.addEventListener("click", (e) => {
            handler(e);
        });
    }
}