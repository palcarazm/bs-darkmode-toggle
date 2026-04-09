import { OptionResolver } from "./core/OptionResolver";
import { StateReducer } from "./core/StateReducer";
import { StorageManager } from "./core/storage/StorageManager";
import { DomManager } from "./core/dom/DomManager";
import { ResolvedOptions, StorageType } from "./core/OptionResolver.types";
import { ActionType } from "./core/StateReducer.types";
import { ColorModes } from "./types/ColorModes";
import { EventManager } from "./core/events/EventManager";
import { DarkModeToggleEvent } from "./core/events/DarkModeToggleEvent";
import { CustomEventTypes } from "./core/events/Events.types";

export class DarkModeToggle {
    private readonly element: HTMLElement;
    private readonly options: ResolvedOptions;
    private readonly state: StateReducer;
    private readonly storage: StorageManager;
    private readonly dom: DomManager;
    private readonly eventManager: EventManager;

    private _destroyed:boolean = false;

    constructor(element: HTMLElement, opts = {}) {
        this.element = element;

        this.options = OptionResolver.resolve(element, opts);
        this.state = new StateReducer(this.options.state, this.options.lightColorMode, this.options.darkColorMode);
        this.storage = new StorageManager(this.options.storage);

        this.applyPreferredScheme();

        const dom = new DomManager(this.element, this.options, (e) => {
            this.toggle();
            e.preventDefault();
        });

        this.dom = dom;

        this.eventManager = new EventManager(this.element, () => dom.roots);

        this.element._bsDarkmodeToggle = this;

        this.setupCrossInstanceSync();
        this.syncState();
    }

    /**
     * Sets up an event listener to handle external theme change events.
     * When an external theme change event is triggered, this method updates the control state.
     * @private
     */
    private setupCrossInstanceSync(){
        globalThis.document.addEventListener(CustomEventTypes.CHANGE, this.handleExternalThemeChange);
    }

    /**
     * Handles an external theme change event by updating the state and the DOM
     * if the root elements of the event and the component share roots.
     * 
     * Implementation note: for performance reasons, DOM is only updated when the state is updated.
     * @private
     * @param e - The external theme change event
     */
    private readonly handleExternalThemeChange = (e: Event) =>{
        const { isLight, roots: eventRoots } = (e as DarkModeToggleEvent).detail;
        
        const thisRoots = this.dom.roots;
        const allRootsAffected = thisRoots.every(root => eventRoots.includes(root));
        
        if (allRootsAffected && this.state.do(ActionType.OVERRIDE, { isLight })) {
            this.dom.setState(this.state.get());
        }
    };

    /**
     * Syncs the state of the dark mode toggle by updating the DOM and persisting the current theme to storage.
     * @private
     */
    private syncState() {
        this.dom.setState(this.state.get());
        this.persistTheme();
    }

    toggle(silent = false) {
        this.ensureNotDestroyed();
        if(!this.state.do(ActionType.TOGGLE)) return;
        this.syncState();
        this.trigger(silent);
    }

    light(silent = false) {
        this.ensureNotDestroyed();
        if(!this.state.do(ActionType.LIGHT)) return;
        this.syncState();
        this.trigger(silent);
    }

    dark(silent = false) {
        this.ensureNotDestroyed();
        if(!this.state.do(ActionType.DARK)) return;
        this.syncState();
        this.trigger(silent);
    }

    setStorageType(type: StorageType) {
        this.ensureNotDestroyed();
        this.storage.setStorageType(type);
        this.persistTheme();
    }

    /**
     * Triggers the events if silent is false.
     * The events are triggered with the current state of the dark mode toggle.
     * Delegates dispatch events to the event manager.
     * @private
     * @param {boolean} silent - Whether to trigger the event.
     */
    private trigger(silent: boolean) {
        if (silent) return;
        this.eventManager.dispatch(this.state.get());
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

    /**
     * Checks if the bs-darkmode-toggle instance has been destroyed.
     * If it has, throws an error indicating that the instance is no longer usable.
     * This is a safety measure to prevent accessing methods of a destroyed instance.
     * @throws {Error} If the instance has been destroyed.
     */
    private ensureNotDestroyed(): void{
        if (this._destroyed) throw new Error("Accessing to a method of a destroyed bs-darkmode-toggle instance.");
    }

    /**
     * Destroys the dark mode toggle by removing the event listener, destroying the dom implementation and removing the reference to the toggle from the element.
     * This method should be called when the dark mode toggle is no longer needed.
     * @returns {void}
     */
    destroy(){
        if(this._destroyed) return;
        globalThis.document.removeEventListener(CustomEventTypes.CHANGE, this.handleExternalThemeChange);
        this.dom.destroy();
        delete this.element._bsDarkmodeToggle;
        this._destroyed = true;
    }
}