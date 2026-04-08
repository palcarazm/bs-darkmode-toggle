export interface DarkModeState {
  isLight: boolean;
  theme: string;
}

export enum ActionType {
    LIGHT = "light",
    DARK = "dark",
    TOGGLE = "toggle",
    OVERRIDE = "override",
}

export type ActionPayloadMap = {
  [ActionType.LIGHT]: undefined;
  [ActionType.DARK]: undefined;
  [ActionType.TOGGLE]: undefined;
  [ActionType.OVERRIDE]: { isLight: boolean };
};