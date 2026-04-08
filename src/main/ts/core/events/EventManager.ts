import { DarkModeState } from "../StateReducer.types";
import { DarkModeToggleEvent } from "./DarkModeToggleEvent";
import { CustomEventTypes, DarkModeToggleEventDetail, LegacyEventTypes } from "./Events.types";

export class EventManager {
    private readonly element: HTMLElement;
    private readonly roots: HTMLElement[];

    constructor(element: HTMLElement, rootSelector: string) {
        this.element = element;
        this.roots = Array.from(
            globalThis.document.querySelectorAll<HTMLElement>(
                rootSelector
            )
        );
    }

    /**
     * Dispatches the darkmode:change event on source and all root elements
     * @param state - The current state of the darkmode toggle
     */
    dispatch(state: DarkModeState) {
        EventManager.dispatchChangeEvent(this.element);
        EventManager.dispatchDarkModeChangeEvent(state.isLight, state.theme, this.element, this.roots);
    }

    /**
     * Dispatches the standard change event for backward compatibility
     * @static
     * @param source - The source element that triggered the change
     */
    private static dispatchChangeEvent(source: HTMLElement): void {
        source.dispatchEvent(
            new Event(LegacyEventTypes.CHANGE, { bubbles: true })
        );
    }

    /**
     * Dispatches the darkmode:change event on source and all root elements
     * @static
     * @param isLight - Whether the current state is light or dark
     * @param theme - The current theme
     * @param source - The source element that triggered the change
     * @param roots - All root elements where the theme should be updated
     */
    private static dispatchDarkModeChangeEvent(
        isLight: boolean,
        theme: string,
        source: HTMLElement,
        roots: HTMLElement[]
    ): void {
        const eventDetail: DarkModeToggleEventDetail = { isLight, theme, source, roots };

        source.dispatchEvent(new DarkModeToggleEvent(CustomEventTypes.CHANGE, eventDetail));

        roots.forEach((root) => {
            root.dispatchEvent(new DarkModeToggleEvent(CustomEventTypes.CHANGE, eventDetail));
        });
    }
}
