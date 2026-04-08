import { ResolvedOptions } from "../OptionResolver.types";
import { DarkModeState } from "../StateReducer.types";

export abstract class AbstractLayout {
    protected readonly root: NodeListOf<HTMLElement>;
    protected readonly lightLabel: string;
    protected readonly darkLabel: string;
    protected readonly style: string;

    protected static readonly BS_ATTRIBUTE = "bsTheme";

    /**
     * Constructs an instance of AbstractLayout with the given container and options.
     * @param {HTMLElement} container - The container element where the layout will be applied.
     * @param {ResolvedOptions} options - The resolved options to apply to the layout.
     */
    constructor(container: HTMLElement, options: ResolvedOptions) {
        this.root = globalThis.document.querySelectorAll<HTMLElement>(options.root);
        this.lightLabel = options.lightLabel;
        this.darkLabel = options.darkLabel;
        this.style = options.style;

        container.innerHTML = "";
        this.createControl(container);
    }

    /**
     * Creates the control element for the layout and appends it to the container.
     * @abstract This method must be overridden in subclasses.
     * @param {HTMLElement} container - The container element where the layout will be applied. 
     */
    protected abstract createControl(container: HTMLElement): void;
    

    /**
     * Updated DOM to current state.
     * - Launch the control state update
     * - Sets the color scheme of all root elements in the layout based on the given current state.
     * @param {DarkModeState} state - The darkmode current state.
     */
    public setState(state: DarkModeState): void{
        this.updateControlState(state);
        this.root.forEach((el) => {
            el.dataset[AbstractLayout.BS_ATTRIBUTE] = state.theme;
        });
    }

    /**
     * Updates the state of the control element.
     * @abstract This method must be overridden in subclasses.
     * @param {DarkModeState} state - The darkmode current state.
     */
    protected abstract updateControlState(state: DarkModeState): void;

    /**
     * Blinks the callback handler for the control element `change event`.
     * @abstract This method must be overridden in subclasses.
     * @param {(e: Event) => void} handler - The callback handler to blink.
     */
    public abstract onChange(handler: (e: Event) => void): void;
}
