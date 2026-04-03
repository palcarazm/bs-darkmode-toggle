import { ResolvedOptions } from "./OptionResolver.types";

export class DOMBuilder {
    private readonly root: NodeListOf<HTMLElement>;
    private readonly input: BootstrapToggleElement;
    private readonly lightColorMode: string;
    private readonly darkColorMode: string;

    private static readonly BS_ATTRIBUTE = "bsTheme";

    constructor(container: HTMLElement, options: ResolvedOptions) {
        this.root = globalThis.document.querySelectorAll<HTMLElement>(options.root);
        this.lightColorMode = options.lightColorMode;
        this.darkColorMode = options.darkColorMode;

        container.innerHTML = "";

        this.input = globalThis.document.createElement("input") as BootstrapToggleElement;
        this.input.type = "checkbox";

        container.appendChild(this.input);

        this.input.bootstrapToggle({
            onlabel: options.lightLabel,
            offlabel: options.darkLabel,
            onstyle: options.style,
            offstyle: options.style,
        });
    }

    setState(isLight: boolean) {
        this.input.bootstrapToggle(
            isLight ? BootstrapToggleMethods.ON : BootstrapToggleMethods.OFF,
            true
        );
        this.root.forEach((el) => {
            el.dataset[DOMBuilder.BS_ATTRIBUTE] = isLight ? this.lightColorMode : this.darkColorMode;
        });
    }

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
