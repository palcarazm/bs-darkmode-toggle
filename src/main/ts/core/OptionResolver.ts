import { sanitize, SanitizeMode } from "./Tools";
import { DarkModeOptions, ResolvedOptions } from "./OptionResolver.types";

export class OptionResolver {
    private static readonly DEFAULTS: ResolvedOptions = {
        state: true,
        root: ":root",
        allowCookie: false,
        lightLabel: "Light",
        darkLabel: "Dark",
        lightColorMode: "light",
        darkColorMode: "dark",
        style: "outline-secondary",
    };

    static resolve(element: HTMLElement, options: DarkModeOptions = {}): ResolvedOptions {
        let state: boolean | null = null;

        const attrState = element.getAttribute("data-state");
        if (attrState === "dark") state = false;
        if (attrState === "light") state = true;

        return {
            state: state ?? options.state ?? this.DEFAULTS.state,
            root: sanitize(element.getAttribute("data-root") || options.root || this.DEFAULTS.root, { mode: SanitizeMode.TEXT })!,
            allowCookie: element.hasAttribute("data-allowCookie") || options.allowCookie || this.DEFAULTS.allowCookie,
            lightLabel: sanitize(element.getAttribute("data-lightLabel") || options.lightLabel || this.DEFAULTS.lightLabel, { mode: SanitizeMode.HTML })!,
            darkLabel: sanitize(element.getAttribute("data-darkLabel") || options.darkLabel || this.DEFAULTS.darkLabel, { mode: SanitizeMode.HTML })!,
            lightColorMode: sanitize(element.getAttribute("data-lightColorMode") || options.lightColorMode || this.DEFAULTS.lightColorMode, { mode: SanitizeMode.TEXT })!,
            darkColorMode: sanitize(element.getAttribute("data-darkColorMode") || options.darkColorMode || this.DEFAULTS.darkColorMode, { mode: SanitizeMode.TEXT })!,
            style: this.DEFAULTS.style,
        };
    }
}