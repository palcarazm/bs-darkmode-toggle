import { DarkModeToggle } from "../DarkModeToggle";
import { Methods } from "./Methods";

declare global {
  interface HTMLElement {
    bsDarkmodeToggle(
      options?: Methods | Record<string, unknown>,
      silent?: boolean
    ): void;
    _bsDarkmodeToggle?: DarkModeToggle;
  }

  interface HTMLElement{
    change: Event;
  }
}

export {};
