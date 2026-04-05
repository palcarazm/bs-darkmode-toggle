/// <reference types="jest" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DarkModeToggle } from "../../main/ts/DarkModeToggle";
import { ActionType } from "../../main/ts/core/StateReducer.types";
import { OptionResolver } from "../../main/ts/core/OptionResolver";
import { ResolvedOptions, StorageType } from "../../main/ts/core/OptionResolver.types";
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
    storage: StorageType.NONE,
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

const setStorageMock = jest.fn();
const getStorageMock = jest.fn();
const deleteStorageMock = jest.fn();
const setStorageTypeMock = jest.fn();

jest.mock("../../main/ts/core/storage/StorageManager", () => {
    return {
        StorageManager: jest.fn().mockImplementation(() => ({
            set: setStorageMock,
            get: getStorageMock,
            delete: deleteStorageMock,
            setStorageType: setStorageTypeMock,
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
            expect(setStorageMock).toHaveBeenCalled();
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
  
    describe("setStorageType", () => {
        it("should change storage type and persist state", () => {
            const instance = new DarkModeToggle(element);
            
            instance.setStorageType(StorageType.LOCAL);
            
            expect(setStorageTypeMock).toHaveBeenCalledWith(StorageType.LOCAL);
            expect(setStorageTypeMock).toHaveBeenCalled();
        });
    });

    describe("applyPreferredScheme()", () => {
        it.each([ColorModes.LIGHT,ColorModes.DARK])("should use stored '%s' value over system preference when stored exists", (colorMode) => {
            getStorageMock.mockReturnValue(colorMode);
            
            setMatchMedia(ColorModes.LIGHT);
            
            const _instance = new DarkModeToggle(element);
            
            expect(doMock).toHaveBeenCalledWith(colorMode);
            expect(doMock).toHaveBeenCalledTimes(1);
        });

        it.each([ColorModes.LIGHT,ColorModes.DARK])("should use system preference '%s' when no stored exists", (colorMode) => {
            getStorageMock.mockReturnValue(null);
            
            setMatchMedia(colorMode);
            
            const _instance = new DarkModeToggle(element);
            
            expect(doMock).toHaveBeenCalledWith(colorMode);
            expect(doMock).toHaveBeenCalledTimes(1);
        });

        it("should fallback to default (light) when no preference detectable and no explicit state", () => {
            getStorageMock.mockReturnValue(null);
            
            setMatchMedia(ColorModes.NONE);
            
            const _instance = new DarkModeToggle(element);
            
            expect(doMock).not.toHaveBeenCalled();
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
            getStorageMock.mockReturnValue(null);
            
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
            expect(setStorageMock).toHaveBeenCalled();
            expect(preventDefault).toHaveBeenCalled();
        });
    });
});