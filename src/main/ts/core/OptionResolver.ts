import { sanitize, SanitizeMode } from "./Tools";
import { DarkModeOptions, Layout, ResolvedOptions, StorageType, ToggleStyle } from "./OptionResolver.types";

export class OptionResolver {
    private static readonly DEFAULTS: ResolvedOptions = {
        state: true,
        root: ":root",
        storage: StorageType.NONE,
        lightLabel: "<i class=\"bs-darkmode-toggle sun\"></i>",
        darkLabel: "<i class=\"bs-darkmode-toggle moon\"></i>",
        lightColorMode: "light",
        darkColorMode: "dark",
        style: "outline-secondary",
        layout : Layout.TOGGLE
    };

    /**
     * Resolves the options for the dark mode toggle by merging user-provided options, HTML data attributes, and defaults.
     * @param element - The base HTML element to parse attributes
     * @param options - The user provided initialization options
     * @returns The option to use
     */
    static resolve(element: HTMLElement, options: DarkModeOptions = {}): ResolvedOptions {
        let state: boolean | null = null;

        const attrState = element.dataset.state;
        if (attrState === "dark") state = false;
        if (attrState === "light") state = true;

        return {
            state: state ?? options.state ?? this.DEFAULTS.state,
            root: sanitize(element.dataset.root || options.root || this.DEFAULTS.root, { mode: SanitizeMode.TEXT })!,
            storage: sanitize(element.dataset.storage || options.storage || this.DEFAULTS.storage, { mode: SanitizeMode.TEXT }) as StorageType,
            lightLabel: sanitize(element.dataset.lightLabel || options.lightLabel || this.DEFAULTS.lightLabel, { mode: SanitizeMode.HTML })!,
            darkLabel: sanitize(element.dataset.darkLabel || options.darkLabel || this.DEFAULTS.darkLabel, { mode: SanitizeMode.HTML })!,
            lightColorMode: sanitize(element.dataset.lightColorMode || options.lightColorMode || this.DEFAULTS.lightColorMode, { mode: SanitizeMode.TEXT })!,
            darkColorMode: sanitize(element.dataset.darkColorMode || options.darkColorMode || this.DEFAULTS.darkColorMode, { mode: SanitizeMode.TEXT })!,
            style: sanitize(element.dataset.style || options.style || this.DEFAULTS.style, { mode: SanitizeMode.TEXT }) as ToggleStyle,
            layout: sanitize(element.dataset.layout || options.layout || this.DEFAULTS.layout, { mode: SanitizeMode.TEXT }) as Layout,
        };
    }
}