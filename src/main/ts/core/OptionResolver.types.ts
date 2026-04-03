export interface DarkModeOptions {
  state?: boolean;
  root?: string;
  allowCookie?: boolean;
  lightLabel?: string;
  darkLabel?: string;
  lightColorMode?: string;
  darkColorMode?: string;
  style?: string;
}

export interface ResolvedOptions {
  state: boolean;
  root: string;
  allowCookie: boolean;
  lightLabel: string;
  darkLabel: string;
  lightColorMode: string;
  darkColorMode: string;
  style: string;
}