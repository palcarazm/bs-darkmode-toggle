import { ActionType, DarkModeState } from "./StateReducer.types";

export class StateReducer {
    private state: DarkModeState;
    private readonly lightColorMode: string;
    private readonly darkColorMode: string;

    constructor(initial: boolean, lightColorMode: string, darkColorMode: string) {
        this.lightColorMode = lightColorMode;
        this.darkColorMode = darkColorMode;
        this.state = { isLight: initial, theme: this.getTheme(initial) };
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
            this.state = { isLight: true, theme: this.getTheme(true) };
            return true;
        case ActionType.DARK:
            if(!this.state.isLight) return false;
            this.state = { isLight: false, theme: this.getTheme(false) };
            return true;
        case ActionType.TOGGLE: {
            const newIsLight = !this.state.isLight;
            this.state = { isLight: newIsLight, theme: this.getTheme(newIsLight) };
            return true;
        }
        }
    }

    /**
     * Returns the theme based on the given isLight state.
     * If isLight is true, returns lightColorMode, otherwise returns darkColorMode.
     * @param isLight - Whether the theme should be light or dark.
     * @returns The theme string.
     */
    private getTheme(isLight: boolean): string {
        return isLight ? this.lightColorMode : this.darkColorMode;
    }

    /**
     * Get the current state.
     * @returns An immutable copy of the current state.
     */
    get(): DarkModeState {
        return Object.freeze({ ...this.state});
    }
}