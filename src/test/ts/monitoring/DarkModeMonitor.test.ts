/// <reference types="jest" />
import { DarkModeMonitor } from "../../../main/ts/monitoring/DarkModeMonitor";
import { LogLevels } from "component-lifecycle";

describe("DarkModeMonitor", () => {
    let monitor: DarkModeMonitor;
    let consoleDebugSpy: jest.SpyInstance;

    beforeEach(() => {
        monitor = DarkModeMonitor.getInstance();
        consoleDebugSpy = jest.spyOn(console, "debug").mockImplementation(() => {});
    });

    afterEach(() => {
        if (monitor) {
            try {
                monitor.stop();
            } catch (e) {
                console.debug("Monitor was not running during cleanup.", e);
            }
        }
        jest.restoreAllMocks();
    });

    describe("DEBUG level", () => {
        it("should log darkmode:change events when started with DEBUG level", () => {
            monitor.start(LogLevels.DEBUG);
            
            const event = new CustomEvent("darkmode:change", {
                detail: {
                    isLight: false,
                    theme: "dark",
                    source: document.createElement("div"),
                    roots: [document.createElement("div")]
                }
            });
            
            document.dispatchEvent(event);
            
            expect(consoleDebugSpy).toHaveBeenCalledWith(
                "[darkmode] Theme changed: dark (theme: dark)",
                expect.objectContaining({
                    source: expect.any(HTMLElement),
                    roots: expect.any(Array)
                })
            );
        });

        it("should handle events without detail gracefully", () => {
            monitor.start(LogLevels.DEBUG);
            
            const event = new CustomEvent("darkmode:change");
            document.dispatchEvent(event);
            
            expect(consoleDebugSpy).toHaveBeenCalledWith("[darkmode] Theme changed (no detail available)");
        });

        it("should not log darkmode:change events when monitor is stopped", () => {
            monitor.start(LogLevels.DEBUG);
            monitor.stop();
            
            const event = new CustomEvent("darkmode:change", {
                detail: { isLight: true, theme: "light", source: document.createElement("div"), roots: [] }
            });
            document.dispatchEvent(event);
            
            expect(consoleDebugSpy).not.toHaveBeenCalled();
        });
    });

    describe("DEBUG level", () => {
        it("should preserve base INFO behavior (no custom INFO logging)", () => {
            monitor.start(LogLevels.INFO);
            
            const event = new CustomEvent("darkmode:change", {
                detail: { isLight: true, theme: "light", source: document.createElement("div"), roots: [] }
            });
            document.dispatchEvent(event);
            
            // INFO level shouldn't log DEBUG events
            expect(consoleDebugSpy).not.toHaveBeenCalled();
        });
    });

    describe("WARN level", () => {
        it("should preserve base WARN behavior (no custom WARN logging)", () => {
            monitor.start(LogLevels.WARN);
            
            const event = new CustomEvent("darkmode:change", {
                detail: { isLight: true, theme: "light", source: document.createElement("div"), roots: [] }
            });
            document.dispatchEvent(event);
            
            // WARN level shouldn't log DEBUG events
            expect(consoleDebugSpy).not.toHaveBeenCalled();
        });
    });

    describe("ERROR level", () => {
        it("should preserve base ERROR behavior (no logging)", () => {
            monitor.start(LogLevels.ERROR);
            
            const event = new CustomEvent("darkmode:change", {
                detail: { isLight: true, theme: "light", source: document.createElement("div"), roots: [] }
            });
            document.dispatchEvent(event);

            // ERROR level shouldn't log DEBUG events
            expect(consoleDebugSpy).not.toHaveBeenCalled();
        });
    });

    describe("level switching", () => {
        it("should start logging after switching from ERROR to DEBUG", () => {
            monitor.start(LogLevels.ERROR);
            
            let event = new CustomEvent("darkmode:change", {
                detail: { isLight: true, theme: "light", source: document.createElement("div"), roots: [] }
            });
            document.dispatchEvent(event);
            expect(consoleDebugSpy).not.toHaveBeenCalled();
            
            monitor.setLevel(LogLevels.DEBUG);
            
            document.dispatchEvent(event);
            expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
        });

        it("should stop logging after switching from DEBUG to ERROR", () => {
            monitor.start(LogLevels.DEBUG);
            
            const event = new CustomEvent("darkmode:change", {
                detail: { isLight: true, theme: "light", source: document.createElement("div"), roots: [] }
            });
            document.dispatchEvent(event);
            expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
            
            monitor.setLevel(LogLevels.ERROR);
            consoleDebugSpy.mockClear();
            
            document.dispatchEvent(event);
            expect(consoleDebugSpy).not.toHaveBeenCalled();
        });
    });
});