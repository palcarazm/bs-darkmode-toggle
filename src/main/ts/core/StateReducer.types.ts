export interface DarkModeState {
  isLight: boolean;
  theme: string;
}

export enum ActionType {
    LIGHT = "light",
    DARK = "dark",
    TOGGLE = "toggle",
}