import { Monitor } from "component-lifecycle";
import { CustomEventTypes, DarkModeToggleEventDetail } from "../core/events/Events.types";

/**
 * Custom monitor for darkmode component that logs custom events.
 * 
 * Extends the base Monitor to add logging for darkmode:change events at DEBUG level.
 * All other log levels (DEBUG, WARN, ERROR) are handled by the base implementation.
 * 
 * @example
 * ```typescript
 * // Start monitoring with INFO level
 * window.Darkmode.MONITOR.start('INFO');
 * 
 * // Enable full debugging (lifecycle + custom events)
 * window.Darkmode.MONITOR.start('DEBUG');
 * 
 * // Stop monitoring
 * window.Darkmode.MONITOR.stop();
 * ```
 */
export class DarkModeMonitor extends Monitor<"darkmode"> {
    private static instance: DarkModeMonitor;
    private constructor() {
        super("darkmode");
    }


    /**
     * Gets the singleton instance of DarkModeMonitor.
     * @returns The DarkModeMonitor instance.
     */
    static getInstance(): DarkModeMonitor {
        if (!DarkModeMonitor.instance) {
            DarkModeMonitor.instance = new DarkModeMonitor();
        }
        return DarkModeMonitor.instance;
    }


    /**
     * Sets up DEBUG level logging.
     * 
     * Extends base DEBUG behavior by adding logging for darkmode:change events.
     * Preserves all base functionality by calling super.setupDebug() first.
     */
    protected setupDebug(): void {
        super.setupDebug();
        
        this.on(CustomEventTypes.CHANGE, (event: CustomEvent<DarkModeToggleEventDetail>) => {
            const detail = event.detail;
            if (detail) {
                console.debug(
                    `[darkmode] Theme changed: ${detail.isLight ? "light" : "dark"} (theme: ${detail.theme})`,
                    { source: detail.source, roots: detail.roots }
                );
            } else {
                console.debug("[darkmode] Theme changed (no detail available)");
            }
        });
    }
}