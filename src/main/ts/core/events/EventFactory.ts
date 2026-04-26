import { DarkModeState } from "../StateReducer.types";
import { DarkModeToggleEventDetail, LegacyEventTypes, PrefixedCustomEventTypes } from "./Events.types";

export class EventFactory {
    /**
     * Creates the event detail payload for dark mode toggle events.
     * @static
     * @param state The current dark mode state.
     * @param element The source element of the event.
     * @param roots The root elements affected by the theme change.
     * @returns The event detail object containing the current state and relevant elements.
     */
    static createEventDetail(state: DarkModeState, element: HTMLElement, roots: HTMLElement[]): DarkModeToggleEventDetail {
        return {
            isLight: state.isLight,
            theme: state.theme,
            source: element,
            roots: roots,
        };
    }

    /**
     * Creates a prefixed custom event for dark mode changes.
     * @static
     * @param state The current dark mode state.
     * @param element The source element of the event.
     * @param roots The root elements affected by the theme change.
     * @returns A CustomEvent with the appropriate type and detail for dark mode changes.
     */
    static createPrefixedEvent(state: DarkModeState, element: HTMLElement, roots: HTMLElement[]): CustomEvent {
        return new CustomEvent(PrefixedCustomEventTypes.CHANGE, {
            detail: this.createEventDetail(state, element, roots),
            bubbles: true
        });
    }

    /**
     * Creates a legacy custom event for dark mode changes.
     * @static
     * @returns A Event with the legacy type for dark mode changes. 
     */
    static createLegacyEvent(): Event {
        return new Event(LegacyEventTypes.CHANGE, { bubbles: true });
    }
}
