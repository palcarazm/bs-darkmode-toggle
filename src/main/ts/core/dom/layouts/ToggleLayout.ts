import { DarkModeState } from "../../StateReducer.types";
import { AbstractLayout } from "../AbstractLayout";

export class ToggleLayout extends AbstractLayout {
    private _input?: BootstrapToggleElement;

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
     * @implements AbstractLayout
     * @param {DarkModeState} state - The darkmode current state.
     */
    updateControlState({isLight}: DarkModeState) {
        this.input.bootstrapToggle(
            isLight ? BootstrapToggleMethods.ON : BootstrapToggleMethods.OFF,
            true
        );
    }

    /**
     * Attach a callback handler for the control element `change event`.
     * @implements AbstractLayout
     * @param {(e: Event) => void} handler - The callback handler to blink
     */
    onChange(handler: (e: Event) => void) {
        this.input.addEventListener("change", handler);
    }
}

export interface BootstrapToggleElement extends HTMLInputElement {
  bootstrapToggle(
    options?: BootstrapToggleMethods | Record<string, unknown>,
    silent?: boolean
  ): void;
}

export enum BootstrapToggleMethods {
  ON = "ON",
  OFF = "OFF",
  TOGGLE = "TOGGLE",
  DETERMINATE = "DETERMINATE",
  INDETERMINATE = "INDETERMINATE",
  ENABLE = "ENABLE",
  DISABLE = "DISABLE",
  READONLY = "READONLY",
  DESTROY = "DESTROY",
  RENDERER = "RENDERER",
}
