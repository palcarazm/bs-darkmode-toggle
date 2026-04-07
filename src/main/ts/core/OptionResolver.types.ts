export interface DarkModeOptions {
    state?: boolean;
    root?: string;
    storage?: StorageType;
    lightLabel?: string;
    darkLabel?: string;
    lightColorMode?: string;
    darkColorMode?: string;
    style?: ToggleStyle;
    layout?: Layout;
}

export interface ResolvedOptions {
    state: boolean;
    root: string;
    storage: StorageType;
    lightLabel: string;
    darkLabel: string;
    lightColorMode: string;
    darkColorMode: string;
    style: ToggleStyle;
    layout: Layout;
}

export type ToggleStyle =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "outline-warning"
    | "outline-info"
    | "outline-light"
    | "outline-dark";

export enum StorageType {
    COOKIE = "cookie",
    LOCAL = "local",
    NONE = "none",
}

export enum Layout {
    BUTTON = "button",
    TOGGLE = "toggle"
}
