/// <reference types="jest" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DarkModeToggle } from "../../main/ts/DarkModeToggle";
import { ActionType } from "../../main/ts/core/StateReducer.types";
import { OptionResolver } from "../../main/ts/core/OptionResolver";
import { ResolvedOptions } from "../../main/ts/core/OptionResolver.types";
import { ColorModes } from "../../main/ts/types/ColorModes";

const setStateMock = jest.fn();
const onChangeMock = jest.fn();

jest.mock("../../main/ts/core/DOMBuilder", () => {
    return {
        DOMBuilder: jest.fn().mockImplementation(() => ({
            setState: setStateMock,
            onChange: onChangeMock,
        })),
    };
});

const baseOptions: ResolvedOptions = {
    state: true,
    root: ":root",
    allowCookie: true,
    lightLabel: "Light",
    darkLabel: "Dark",
    lightColorMode: "light",
    darkColorMode: "dark",
    style: "outline-secondary",
};

const resolveMock = jest.spyOn(OptionResolver, "resolve").mockReturnValue({ ...baseOptions });

const doMock = jest.fn();
const getMock = jest.fn();

jest.mock("../../main/ts/core/StateReducer", () => {
    return {
        StateReducer: jest.fn().mockImplementation(() => ({
            do: doMock,
            get: getMock,
        })),
    };
});

const setCookieMock = jest.fn();
const getCookieMock = jest.fn();
const deleteCookieMock = jest.fn();

jest.mock("../../main/ts/core/CookieManager", () => {
    return {
        CookieManager: jest.fn().mockImplementation(() => ({
            set: setCookieMock,
            get: getCookieMock,
            delete: deleteCookieMock,
        })),
    };
});

const matchMediaMock = jest.fn();

function setMatchMedia(colorMode: ColorModes) {
    matchMediaMock.mockImplementation((query) => ({
        matches: query === `(prefers-color-scheme: ${colorMode})`,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
    }));
}

describe("DarkModeToggle", () => {
    let element: HTMLElement;

    beforeEach(() => {
        jest.clearAllMocks();

        element = document.createElement("div");

        resolveMock.mockReturnValue({ ...baseOptions });

        getMock.mockReturnValue({ isLight: true });
        doMock.mockReturnValue(true);

        globalThis.window.matchMedia = matchMediaMock;
    });


    describe("constructor", () => {
        it("should initialize and call update", () => {
            const _instance = new DarkModeToggle(element);

            expect(setStateMock).toHaveBeenCalledWith(true);
            expect(setCookieMock).toHaveBeenCalled();
            expect((element as any)._bsDarkmodeToggle).toBeDefined();
        });

        it("should bind onChange handler", () => {
            const _instance = new DarkModeToggle(element);

            expect(onChangeMock).toHaveBeenCalled();
        });
    });

    describe("toggle(silent = false)", () => {
        it("should toggle and trigger event", () => {
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.toggle();

            expect(doMock).toHaveBeenCalledWith(ActionType.TOGGLE);
            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
        });

        it("should NOT toggle if reducer returns false", () => {
            doMock.mockReturnValue(false);
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.toggle();

            expect(setStateMock).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).not.toHaveBeenCalled();
        });

        it("should not trigger event when silent", () => {
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.toggle(true);

            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchSpy).not.toHaveBeenCalled();
        });
    });

    describe("light(silent = false)", () => {
        it("should set light and trigger event", () => {
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.light();

            expect(doMock).toHaveBeenCalledWith(ActionType.LIGHT);
            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
        });

        it("should NOT set light if reducer returns false", () => {
            doMock.mockReturnValue(false);
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.light();

            expect(setStateMock).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).not.toHaveBeenCalled();
        });

        it("should not trigger event when silent", () => {
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.light(true);

            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchSpy).not.toHaveBeenCalled();
        });
    });

    describe("dark(silent = false)", () => {
        it("should set dark and trigger event", () => {
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.dark();

            expect(doMock).toHaveBeenCalledWith(ActionType.DARK);
            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
        });

        it("should NOT set dark if reducer returns false", () => {
            doMock.mockReturnValue(false);
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.dark();

            expect(setStateMock).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).not.toHaveBeenCalled();
        });

        it("should not trigger event when silent", () => {
            const dispatchSpy = jest.spyOn(element, "dispatchEvent");

            const instance = new DarkModeToggle(element);

            instance.dark(true);

            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchSpy).not.toHaveBeenCalled();
        });
    });
  
    describe("cookie integration", () => {
        it("should allow cookie and update", () => {
            const instance = new DarkModeToggle(element);

            instance.allowCookie();

            expect(setCookieMock).toHaveBeenCalled();
        });

        it("should deny cookie and delete", () => {
            const instance = new DarkModeToggle(element);

            instance.denyCookie();

            expect(deleteCookieMock).toHaveBeenCalled();
        });
        
        it("should NOT set cookie if disabled", () => {
            resolveMock.mockReturnValue({ ...baseOptions, allowCookie: false });

            const _instance = new DarkModeToggle(element);

            expect(setCookieMock).not.toHaveBeenCalled();
        });
    });

    describe("applyPreferredScheme()", () => {
        it("should use cookie over system preference when cookie exists", () => {
            getCookieMock.mockReturnValue("dark");
            
            setMatchMedia(ColorModes.LIGHT);
            
            const _instance = new DarkModeToggle(element);
            
            expect(doMock).toHaveBeenCalledWith(ActionType.DARK);
        });

        it("should use system preference when no cookie exists and allowCookie is true", () => {
            getCookieMock.mockReturnValue(null);
            
            setMatchMedia(ColorModes.DARK);
            
            const _instance = new DarkModeToggle(element);
            
            expect(doMock).toHaveBeenCalledWith(ActionType.DARK);
        });

        it("should use system preference (light) when no cookie exists", () => {
            getCookieMock.mockReturnValue(null);
            
            setMatchMedia(ColorModes.LIGHT);
            
            const _instance = new DarkModeToggle(element);
            
            expect(doMock).toHaveBeenCalledWith(ActionType.LIGHT);
        });

        it("should fallback to default (light) when no preference detectable and no explicit state", () => {
            getCookieMock.mockReturnValue(null);
            
            setMatchMedia(ColorModes.NONE);
            
            const _instance = new DarkModeToggle(element);
            
            expect(doMock).not.toHaveBeenCalled();
        });

        it("should NOT use cookie when allowCookie is false even if cookie exists", () => {
            resolveMock.mockReturnValue({ ...baseOptions, allowCookie: false });
            getCookieMock.mockReturnValue("light");
            
            setMatchMedia(ColorModes.DARK);
            
            const _instance = new DarkModeToggle(element);
            
            expect(doMock).toHaveBeenCalledWith(ActionType.DARK);
        });
    });

    describe("getSystemPreference()", () => {
        it.each([ColorModes.DARK, ColorModes.LIGHT])("should return the correct preference when system prefers %s", (expectedPreference) => {
            setMatchMedia(expectedPreference);
            
            const instance = new DarkModeToggle(element);
            const result = (instance as any).getSystemPreference();
            
            expect(result).toBe(expectedPreference);
        });

        it("should return null when matchMedia not available", () => {
            globalThis.window.matchMedia = undefined as any;
            
            const instance = new DarkModeToggle(element);
            const result = (instance as any).getSystemPreference();
            
            expect(result).toBe(ColorModes.NONE);
        });

        it("should return null when no preference detected", () => {
            setMatchMedia(ColorModes.NONE);
            
            const instance = new DarkModeToggle(element);
            const result = (instance as any).getSystemPreference();
            
            expect(result).toBe(ColorModes.NONE);
        });

        it("should handle missing matchMedia gracefully (old browsers)", () => {
            getCookieMock.mockReturnValue(null);
            
            globalThis.window.matchMedia = undefined as any;

            expect(() => (new DarkModeToggle(element) as any).getSystemPreference()).not.toThrow();
            expect((new DarkModeToggle(element) as any).getSystemPreference()).toBe(ColorModes.NONE);
        });
    });

    describe("DOM change event", () => {
        it("should handle DOM change event", () => {
            let handler: any;

            onChangeMock.mockImplementation((cb) => {
                handler = cb;
            });

            const _instance = new DarkModeToggle(element);

            const preventDefault = jest.fn();

            handler({ preventDefault });

            expect(doMock).toHaveBeenCalledWith(ActionType.TOGGLE);
            expect(setCookieMock).toHaveBeenCalled();
            expect(preventDefault).toHaveBeenCalled();
        });
    });
});