export interface DarkModeOptions {
  state?: boolean;
  root?: string;
  allowCookie?: boolean;
  lightLabel?: string;
  darkLabel?: string;
  lightColorMode?: string;
  darkColorMode?: string;
  style?: ToggleStyle;
}

export interface ResolvedOptions {
  state: boolean;
  root: string;
  allowCookie: boolean;
  lightLabel: string;
  darkLabel: string;
  lightColorMode: string;
  darkColorMode: string;
  style: ToggleStyle;
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