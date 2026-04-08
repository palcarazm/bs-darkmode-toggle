export interface DarkModeToggleEventDetail {
  isLight: boolean;
  theme: string;
  source: HTMLElement;
  roots: HTMLElement[];
}

export enum CustomEventTypes{
    CHANGE = "darkmode:change",
}

export enum LegacyEventTypes{
    CHANGE = "change",
}

export type EventTypes = CustomEventTypes | LegacyEventTypes;
