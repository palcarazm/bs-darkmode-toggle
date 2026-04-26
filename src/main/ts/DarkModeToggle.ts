import { OptionResolver } from "./core/OptionResolver";
import { StateReducer } from "./core/StateReducer";
import { StorageManager } from "./core/storage/StorageManager";
import { DomManager } from "./core/dom/DomManager";
import { ResolvedOptions, StorageType } from "./core/OptionResolver.types";
import { ActionType } from "./core/StateReducer.types";
import { ColorModes } from "./types/ColorModes";
import { EventFactory } from "./core/events/EventFactory";
import { CustomEventTypes, PrefixedCustomEventTypes } from "./core/events/Events.types";
import type { DarkModeToggleEventMap } from "./core/events/Events.types";
import { Component } from "component-lifecycle";

export class DarkModeToggle extends Component<"darkmode", DarkModeToggleEventMap> {
    protected readonly PREFIX = "darkmode";
    private readonly toggleOptions: ResolvedOptions;
    private readonly toggleState: StateReducer;
    private storage?: StorageManager;
    private dom?: DomManager;

    constructor(element: HTMLElement, opts = {}) {
        super(element);

        this.toggleOptions = OptionResolver.resolve(element, opts);
        this.toggleState = new StateReducer(this.toggleOptions.state, this.toggleOptions.lightColorMode, this.toggleOptions.darkColorMode);
    }

    /**
     * Factory method to create an instance of DarkModeToggle.
     * @param element the root element for the dark mode toggle component. The component will look for configuration options in this element's attributes.
     * @param opts the user provided options to configure the dark mode toggle instance. These options will override any configuration found in the element's attributes.
     * @returns A promise that resolves to the created and initialized DarkModeToggle instance
     */
    static async create(element: HTMLElement, opts = {}): Promise<DarkModeToggle> {
        const instance = new DarkModeToggle(element, opts);
        await instance.init();
        await instance.attach();
        return instance;
    }

    protected async doInit(): Promise<{ cancelled: boolean; reason?: string }> {
        this.storage = new StorageManager(this.toggleOptions.storage);
        this.applyPreferredScheme();
        return { cancelled: false };
    }

    protected async doAttach(): Promise<{ cancelled: boolean; reason?: string }> {
        const dom = new DomManager(this.element, this.toggleOptions, (e) => {
            this.toggle();
            e.preventDefault();
        });

        this.dom = dom;

        this.element._bsDarkmodeToggle = this;

        this.setupCrossInstanceSync();
        this.syncState();
        return { cancelled: false };
    }

    protected async doDispose(): Promise<{ cancelled: boolean; reason?: string }> {
        globalThis.document.removeEventListener(PrefixedCustomEventTypes.CHANGE, this.handleExternalThemeChange);
        return { cancelled: false };
    }

    protected async doDestroy(): Promise<{ cancelled: boolean; reason?: string }> {
        if(this.isAttached()) await this.dispose();
        this.dom?.destroy();
        delete this.element._bsDarkmodeToggle;
        return { cancelled: false };
    }

    /**
     * Sets up an event listener to handle external theme change events.
     * When an external theme change event is triggered, this method updates the control state.
     * @private
     */
    private setupCrossInstanceSync(){
        globalThis.document.addEventListener(PrefixedCustomEventTypes.CHANGE, this.handleExternalThemeChange);
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
        const detail = (e as CustomEvent)?.detail;
        if (!detail || typeof detail.isLight !== "boolean" || !Array.isArray(detail.roots)) {
            return;
        }
        const { isLight, roots: eventRoots } = detail;
        
        const thisRoots = this.dom?.roots;
        const allRootsAffected = thisRoots?.every(root => eventRoots.includes(root));
        
        if (allRootsAffected && this.toggleState.do(ActionType.OVERRIDE, { isLight })) {
            this.dom?.setState(this.toggleState.get());
        }
    };

    /**
     * Syncs the state of the dark mode toggle by updating the DOM and persisting the current theme to storage.
     * @private
     */
    private syncState() {
        this.dom?.setState(this.toggleState.get());
        this.persistTheme();
    }

    toggle(silent = false) {
        this.ensureNotDestroyed();
        if(!this.toggleState.do(ActionType.TOGGLE)) return;
        this.syncState();
        this.trigger(silent);
    }

    light(silent = false) {
        this.ensureNotDestroyed();
        if(!this.toggleState.do(ActionType.LIGHT)) return;
        this.syncState();
        this.trigger(silent);
    }

    dark(silent = false) {
        this.ensureNotDestroyed();
        if(!this.toggleState.do(ActionType.DARK)) return;
        this.syncState();
        this.trigger(silent);
    }

    setStorageType(type: StorageType) {
        this.ensureNotDestroyed();
        this.storage?.setStorageType(type);
        this.persistTheme();
    }

    /**
     * Triggers the events if silent is false.
     * The events are triggered with the current state of the dark mode toggle.
     * Emits the typed event via Component.emit and dispatches the legacy event manually.
     * @private
     * @param {boolean} silent - Whether to trigger the event.
     */
    private trigger(silent: boolean) {
        if (silent) return;

        const legacyEvent = EventFactory.createLegacyEvent();
        this.element.dispatchEvent(legacyEvent);

        const roots = this.dom?.roots || [];
        const currentState = this.toggleState.get();
        const eventDetail = EventFactory.createEventDetail(currentState, this.element, roots);
        this.emit(CustomEventTypes.CHANGE, eventDetail);
        roots.forEach((root) => {
            root.dispatchEvent(EventFactory.createPrefixedEvent(currentState, this.element, roots));
        });
    }

    /**
     * Persist the current theme to the storage.
     * @private
     */
    private persistTheme() {
        this.storage?.set(this.toggleState.get().theme);
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
        const value = this.storage?.get();

        if (value === this.toggleOptions.darkColorMode) {
            this.toggleState.do(ActionType.DARK);
            return true;
        }
        if (value === this.toggleOptions.lightColorMode) {
            this.toggleState.do(ActionType.LIGHT);
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
            this.toggleState.do(ActionType.DARK);
            return true;
        }
        if (systemPreference === ColorModes.LIGHT) {
            this.toggleState.do(ActionType.LIGHT);
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
        if (this.isDestroyed()) throw new Error("Accessing to a method of a destroyed bs-darkmode-toggle instance.");
    }
}