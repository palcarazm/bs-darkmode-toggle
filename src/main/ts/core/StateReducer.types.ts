export interface DarkModeState {
  isLight: boolean;
}

export enum ActionType {
    LIGHT = "light",
    DARK = "dark",
    TOGGLE = "toggle",
}