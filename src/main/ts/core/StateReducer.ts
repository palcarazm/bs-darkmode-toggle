import { ActionType, DarkModeState } from "./StateReducer.types";

export class StateReducer {
    private state: DarkModeState;

    constructor(initial: boolean) {
        this.state = { isLight: initial };
    }

    /**
     * Apply an action to the current state.
     * @param action The action to be performed
     * @returns A boolean indicating whether the action was successful.
     */
    do(action: ActionType): boolean{
        switch (action) {
        case ActionType.LIGHT:
            if(this.state.isLight) return false;
            this.state = { isLight: true };
            return true;
        case ActionType.DARK:
            if(!this.state.isLight) return false;
            this.state = { isLight: false };
            return true;
        case ActionType.TOGGLE:
            this.state = { isLight: !this.state.isLight };
            return true;
        }
    }

    /**
     * Get the current state.
     * @returns An immutable copy of the current state.
     */
    get(): DarkModeState {
        return Object.freeze({ ...this.state });
    }
}