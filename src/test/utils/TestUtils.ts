import { Layout, ResolvedOptions, StorageType } from "../../main/ts/core/OptionResolver.types";

export class TestUtils{

    /**
     * Gets the base options that are used when no options are provided.
     * @returns {ResolvedOptions} The base options.
     */
    static get baseOptions():ResolvedOptions{
        return {
            state: true,
            root: ":root",
            storage: StorageType.NONE,
            lightLabel: "Light",
            darkLabel: "Dark",
            lightColorMode: "light",
            darkColorMode: "dark",
            style: "outline-secondary",
            layout: Layout.TOGGLE,
            lightAriaLabel: "Switch to dark mode",
            darkAriaLabel: "Switch to light mode",
        };
    }
}