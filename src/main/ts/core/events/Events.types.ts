import type { ExtendableEventMap } from "component-lifecycle";

export interface DarkModeToggleEventDetail {
  isLight: boolean;
  theme: string;
  source: HTMLElement;
  roots: HTMLElement[];
}

export enum CustomEventTypes{
    CHANGE = "change",
}

export enum PrefixedCustomEventTypes{
    CHANGE = "darkmode:change",
};

export enum LegacyEventTypes{
    CHANGE = "change",
}

export type EventTypes = PrefixedCustomEventTypes | LegacyEventTypes;

export type DarkModeToggleEventMap = ExtendableEventMap<
  "darkmode",
  {
    [CustomEventTypes.CHANGE]: DarkModeToggleEventDetail;
  }
>;
