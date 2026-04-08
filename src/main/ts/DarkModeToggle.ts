import { OptionResolver } from "./core/OptionResolver";
import { StateReducer } from "./core/StateReducer";
import { StorageManager } from "./core/storage/StorageManager";
import { DomManager } from "./core/dom/DomManager";
import { ResolvedOptions, StorageType } from "./core/OptionResolver.types";
import { ActionType } from "./core/StateReducer.types";
import { ColorModes } from "./types/ColorModes";

export class DarkModeToggle {
    private readonly element: HTMLElement;
    private readonly options: ResolvedOptions;
    private readonly state: StateReducer;
    private readonly storage: StorageManager;
    private readonly dom: DomManager;

    constructor(element: HTMLElement, opts = {}) {
        this.element = element;

        this.options = OptionResolver.resolve(element, opts);
        this.state = new StateReducer(this.options.state, this.options.lightColorMode, this.options.darkColorMode);
        this.storage = new StorageManager(this.options.storage);

        this.applyPreferredScheme();

        this.dom = new DomManager(this.element, this.options, (e) => {
            this.toggle(true);
            this.persistTheme();
            e.preventDefault();
        });

        this.element._bsDarkmodeToggle = this;

        this.syncState();
    }

    /**
     * Syncs the state of the dark mode toggle by updating the DOM and persisting the current theme to storage.
     * @private
     */
    private syncState() {
        this.dom.setState(this.state.get());
        this.persistTheme();
    }

    toggle(silent = false) {
        if(!this.state.do(ActionType.TOGGLE)) return;
        this.syncState();
        this.trigger(silent);
    }

    light(silent = false) {
        if(!this.state.do(ActionType.LIGHT)) return;
        this.syncState();
        this.trigger(silent);
    }

    dark(silent = false) {
        if(!this.state.do(ActionType.DARK)) return;
        this.syncState();
        this.trigger(silent);
    }

    setStorageType(type: StorageType) {
        this.storage.setStorageType(type);
        this.persistTheme();
    }

    private trigger(silent: boolean) {
        if (!silent) {
            this.element.dispatchEvent(new Event("change", { bubbles: true }));
        }
    }

    /**
     * Persist the current theme to the storage.
     * @private
     */
    private persistTheme() {
        this.storage.set(this.state.get().theme);
    }

    /**
     * Applies the preferred color scheme based on cookies or system preference
     * @returns a boolean indicating whether a preference was applied (true) or not (false)
     */
    private applyPreferredScheme(): boolean {
        return this.applyStoredPreference() || this.applySystemPreference();
    }

    /**
     * Applies the color scheme based on stored preference if available
     * @returns a boolean indicating whether a preference was applied (true) or not (false)
     */
    private applyStoredPreference(): boolean {
        const value = this.storage.get();

        if (value === this.options.darkColorMode) {
            this.state.do(ActionType.DARK);
            return true;
        }
        if (value === this.options.lightColorMode) {
            this.state.do(ActionType.LIGHT);
            return true;
        }
        return false;
    }

    /**
     * Applies the color scheme based on system preferences if available
     * @returns a boolean indicating whether a preference was applied (true) or not (false)
     */
    private applySystemPreference(): boolean {
        const systemPreference = this.getSystemPreference();
        if (systemPreference === ColorModes.DARK) {
            this.state.do(ActionType.DARK);
            return true;
        }
        if (systemPreference === ColorModes.LIGHT) {
            this.state.do(ActionType.LIGHT);
            return true;
        }
        return false;
    }

    /**
     * Gets the system color scheme preference if available
     * @returns color scheme preference as `ColorModes`
     */
    private getSystemPreference(): ColorModes {
        try {
            const darkModeQuery = globalThis.window?.matchMedia("(prefers-color-scheme: dark)");
            const lightModeQuery = globalThis.window?.matchMedia("(prefers-color-scheme: light)");
            
            if (darkModeQuery?.matches) {
                return ColorModes.DARK;
            }
            if (lightModeQuery?.matches) {
                return ColorModes.LIGHT;
            }
            return ColorModes.NONE;
        } catch (error) {
            console.warn("Unable to detect system color scheme preference:", error);
            return ColorModes.NONE;
        }
    }
}