import { CustomEventTypes, DarkModeToggleEventDetail } from "./Events.types";

export class DarkModeToggleEvent extends CustomEvent<DarkModeToggleEventDetail> {
    constructor(type: CustomEventTypes, detail: DarkModeToggleEventDetail) {
        super(type, {
            bubbles: true,
            detail,
        });
    }
}
