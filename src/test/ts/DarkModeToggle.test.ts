/// <reference types="jest" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DarkModeToggle } from "../../main/ts/DarkModeToggle";
import { ActionType } from "../../main/ts/core/StateReducer.types";
import { OptionResolver } from "../../main/ts/core/OptionResolver";
import { StorageType } from "../../main/ts/core/OptionResolver.types";
import { ColorModes } from "../../main/ts/types/ColorModes";
import { CustomEventTypes } from "../../main/ts/core/events/Events.types";
import { DarkModeToggleEvent } from "../../main/ts/core/events/DarkModeToggleEvent";
import { DomManager } from "../../main/ts/core/dom/DomManager";
import { TestUtils } from "../utils/TestUtils";

const setStateMock = jest.fn();

const domManagerMock: Partial<DomManager> = {
    setState: setStateMock,
    destroy: jest.fn(),
    roots: [],
};

jest.mock("../../main/ts/core/dom/DomManager", () => {
    return {
        DomManager: jest.fn().mockImplementation(() => domManagerMock),
    };
});

const resolveMock = jest.spyOn(OptionResolver, "resolve").mockReturnValue({ ...TestUtils.baseOptions });

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

const dispatchMock = jest.fn();
jest.mock("../../main/ts/core/events/EventManager", () => {
    return {
        EventManager: jest.fn().mockImplementation(() => ({
            dispatch: dispatchMock,
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
    let instance: DarkModeToggle;
    let element: HTMLElement;
    let documentAddEventListenerSpy: jest.SpyInstance;
    let documentRemoveEventListenerSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        (domManagerMock as any).roots = [];

        element = document.createElement("div");

        resolveMock.mockReturnValue({ ...TestUtils.baseOptions });

        getMock.mockReturnValue({ isLight: true, theme: "light" });
        doMock.mockReturnValue(true);

        globalThis.window.matchMedia = matchMediaMock;
        documentAddEventListenerSpy = jest.spyOn(globalThis.document, "addEventListener");
        documentRemoveEventListenerSpy = jest.spyOn(globalThis.document, "removeEventListener");
    });

    afterEach(async () => {
        if (instance) await instance.destroy();
        for (const [eventName, listener] of documentAddEventListenerSpy.mock.calls) {
            globalThis.document.removeEventListener(eventName, listener);
        }
        documentAddEventListenerSpy.mockRestore();
        documentRemoveEventListenerSpy.mockRestore();
    });


    describe("constructor", () => {
        it("should initialize and call update", (done) => {
            instance = new DarkModeToggle(element);
            instance.init().then(() => {instance.attach();});

            instance.once("darkmode:attached", () => {
                expect(setStateMock).toHaveBeenCalledWith({ isLight: true, theme: "light" });
                expect(setStorageMock).toHaveBeenCalled();
                expect((element as any)._bsDarkmodeToggle).toBeDefined();
                done();
            });
        });

        it("should set up cross-instance synchronization listener", (done) => {
            instance = new DarkModeToggle(element);
            instance.init().then(() => {instance.attach();});
            
            instance.once("darkmode:attached", () => {
                expect(documentAddEventListenerSpy).toHaveBeenCalledWith(
                    CustomEventTypes.CHANGE,
                    expect.any(Function)
                );
                done();
            });
        });

        it("should initialize and call update with factory", async () => {
            instance = await DarkModeToggle.create(element);

            expect(setStateMock).toHaveBeenCalledWith({ isLight: true, theme: "light" });
            expect(setStorageMock).toHaveBeenCalled();
            expect((element as any)._bsDarkmodeToggle).toBeDefined();
        });
    });

    describe("toggle(silent = false)", () => {
        it("should toggle and trigger event", async () => {
            instance = await DarkModeToggle.create(element);
            
            instance.toggle();

            expect(doMock).toHaveBeenCalledWith(ActionType.TOGGLE);
            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchMock).toHaveBeenCalledTimes(1);
        });

        it("should NOT toggle if reducer returns false", async () => {
            doMock.mockReturnValue(false);
            instance = await DarkModeToggle.create(element);
            
            instance.toggle();

            expect(setStateMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).not.toHaveBeenCalled();
        });

        it("should not trigger event when silent", async () => {
            instance = await DarkModeToggle.create(element);
            
            instance.toggle(true);

            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchMock).not.toHaveBeenCalled();
        });

        it("should throw error if destroyed", async () => {
            instance = await DarkModeToggle.create(element);

            await instance.destroy();
            expect(() => instance.toggle()).toThrow("Accessing to a method of a destroyed bs-darkmode-toggle instance.");
        });
    });

    describe("light(silent = false)", () => {
        it("should set light and trigger event", async () => {
            instance = await DarkModeToggle.create(element);
            
            instance.light();

            expect(doMock).toHaveBeenCalledWith(ActionType.LIGHT);
            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchMock).toHaveBeenCalledTimes(1);
        });

        it("should NOT set light if reducer returns false", async () => {
            doMock.mockReturnValue(false);

            instance = await DarkModeToggle.create(element);
            
            instance.light();

            expect(setStateMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).not.toHaveBeenCalled();
        });

        it("should not trigger event when silent", async () => {
            instance = await DarkModeToggle.create(element);
            
            instance.light(true);

            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchMock).not.toHaveBeenCalled();
        });

        it("should throw error if destroyed", async () => {
            instance = await DarkModeToggle.create(element);
            
            await instance.destroy();
            expect(() => instance.light()).toThrow("Accessing to a method of a destroyed bs-darkmode-toggle instance.");
        });
    });

    describe("dark(silent = false)", () => {
        it("should set dark and trigger event", async () => {
            instance = await DarkModeToggle.create(element);
            
            instance.dark();

            expect(doMock).toHaveBeenCalledWith(ActionType.DARK);
            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchMock).toHaveBeenCalledTimes(1);
        });

        it("should NOT set dark if reducer returns false", async () => {
            doMock.mockReturnValue(false);

            instance = await DarkModeToggle.create(element);
            
            instance.dark();

            expect(setStateMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).not.toHaveBeenCalled();
        });

        it("should not trigger event when silent", async () => {
            instance = await DarkModeToggle.create(element);
            
            instance.dark(true);

            expect(setStateMock).toHaveBeenCalledTimes(2);
            expect(dispatchMock).not.toHaveBeenCalled();
        });

        it("should throw error if destroyed", async () => {
            instance = await DarkModeToggle.create(element);
            
            await instance.destroy();
            expect(() => instance.dark()).toThrow("Accessing to a method of a destroyed bs-darkmode-toggle instance.");
        });
    });
  
    describe("setStorageType", () => {
        it("should change storage type and persist state", async () => {
            instance = await DarkModeToggle.create(element);
            
            instance.setStorageType(StorageType.LOCAL);
            
            expect(setStorageTypeMock).toHaveBeenCalledWith(StorageType.LOCAL);
            expect(setStorageTypeMock).toHaveBeenCalled();
        });

        it("should throw error if destroyed", async () => {
            instance = await DarkModeToggle.create(element);
            
            await instance.destroy();
            expect(() => instance.setStorageType(StorageType.LOCAL)).toThrow("Accessing to a method of a destroyed bs-darkmode-toggle instance.");
        });
    });

    describe("applyPreferredScheme()", () => {
        it.each([ColorModes.LIGHT,ColorModes.DARK])("should use stored '%s' value over system preference when stored exists", async (colorMode) => {
            getStorageMock.mockReturnValue(colorMode);
            
            setMatchMedia(ColorModes.LIGHT);
            
            instance = await DarkModeToggle.create(element);

            expect(doMock).toHaveBeenCalledWith(colorMode);
            expect(doMock).toHaveBeenCalledTimes(1);
        });

        it.each([ColorModes.LIGHT,ColorModes.DARK])("should use system preference '%s' when no stored exists", async (colorMode) => {
            getStorageMock.mockReturnValue(null);
            
            setMatchMedia(colorMode);
            
            instance = await DarkModeToggle.create(element);

            expect(doMock).toHaveBeenCalledWith(colorMode);
            expect(doMock).toHaveBeenCalledTimes(1);
            
        });

        it("should fallback to default (light) when no preference detectable and no explicit state", async () => {
            getStorageMock.mockReturnValue(null);
            
            setMatchMedia(ColorModes.NONE);
            
            instance = await DarkModeToggle.create(element);

            expect(doMock).not.toHaveBeenCalled();
        });
    });

    describe("getSystemPreference()", () => {
        it.each([ColorModes.DARK, ColorModes.LIGHT])("should return the correct preference when system prefers %s", async (expectedPreference) => {
            setMatchMedia(expectedPreference);
            
            instance = await DarkModeToggle.create(element);
            const result = (instance as any).getSystemPreference();
                
            expect(result).toBe(expectedPreference);
        });

        it("should return null when matchMedia not available", async () => {
            globalThis.window.matchMedia = undefined as any;
            
            instance = await DarkModeToggle.create(element);
            const result = (instance as any).getSystemPreference();
                
            expect(result).toBe(ColorModes.NONE);
        });

        it("should return null when no preference detected", async () => {
            setMatchMedia(ColorModes.NONE);
            
            instance = await DarkModeToggle.create(element);
            const result = (instance as any).getSystemPreference();
                
            expect(result).toBe(ColorModes.NONE);
        });

        it("should handle missing matchMedia gracefully (old browsers)", async () => {
            getStorageMock.mockReturnValue(null);
            
            globalThis.window.matchMedia = undefined as any;

            instance = await DarkModeToggle.create(element);

            expect(() => (instance as any).getSystemPreference()).not.toThrow();
            expect((instance as any).getSystemPreference()).toBe(ColorModes.NONE);

        });
    });

    describe("cross-instance synchronization", () => {
        let root1: HTMLElement;
        let root2: HTMLElement;

        beforeEach(() => {
            root1 = document.createElement("div");
            root2 = document.createElement("div");
            root1.className = "root";
            root2.className = "root";
            document.body.appendChild(root1);
            document.body.appendChild(root2);

            (domManagerMock as any).roots = [root1, root2];
        });

        afterEach(() => {
            root1.remove();
            root2.remove();
        });

        it("should update state and DOM when external event shares roots", async () => {
            doMock.mockReturnValue(true);
            instance = await DarkModeToggle.create(element);
            setStateMock.mockClear();
            
            const event = new DarkModeToggleEvent(CustomEventTypes.CHANGE,
                { isLight: false, theme: "dark", source: element, roots: [root1, root2] }
            );
            
            globalThis.document.dispatchEvent(event);
            
            expect(doMock).toHaveBeenCalledWith(ActionType.OVERRIDE, {isLight:false});
            expect(setStateMock).toHaveBeenCalledTimes(1);
        });

        it("should NOT update DOM when event state matches current state", async () => {
            doMock.mockReturnValue(false);
            instance = await DarkModeToggle.create(element);
            setStateMock.mockClear();
            
            const event = new DarkModeToggleEvent(CustomEventTypes.CHANGE,
                { isLight: true, theme: "light", source: element, roots: [root1, root2] }
            );
            
            globalThis.document.dispatchEvent(event);
            
            expect(doMock).toHaveBeenCalledWith(ActionType.OVERRIDE, {isLight:true});
            expect(setStateMock).toHaveBeenCalledTimes(0);
        });

        it("should NOT update state and DOM when external event has no shared roots", async () => {
            const differentRoot = document.createElement("div");

            instance = await DarkModeToggle.create(element);
            setStateMock.mockClear();
            
            const event = new DarkModeToggleEvent(CustomEventTypes.CHANGE,
                { isLight: true, theme: "light", source: element, roots: [differentRoot] }
            );
            
            globalThis.document.dispatchEvent(event);
            
            expect(doMock).not.toHaveBeenCalled();
            expect(setStateMock).toHaveBeenCalledTimes(0);
        });

        it("should NOT update when event affects only a subset of roots", async () => {
            instance = await DarkModeToggle.create(element);
            setStateMock.mockClear();

            const event = new DarkModeToggleEvent(CustomEventTypes.CHANGE,
                { isLight: false, theme: "dark", source: element, roots: [root1] }
            );

            globalThis.document.dispatchEvent(event);

            expect(doMock).not.toHaveBeenCalled();
            expect(setStateMock).toHaveBeenCalledTimes(0);
        });

        it("should not update storage or trigger events when external event is received", async () => {
            instance = await DarkModeToggle.create(element);
            setStorageMock.mockClear();
            dispatchMock.mockClear();
                    
            const event = new DarkModeToggleEvent(CustomEventTypes.CHANGE,
                { isLight: true, theme: "light", source: element, roots: [root1, root2] }
            );

            globalThis.document.dispatchEvent(event);

            expect(setStorageMock).toHaveBeenCalledTimes(0);
            expect(dispatchMock).toHaveBeenCalledTimes(0);
        });
    });

    describe("destroy", () => {
        it("should remove event listeners", async () => {
            instance = await DarkModeToggle.create(element);
            await instance.destroy();
            expect(documentAddEventListenerSpy).toHaveBeenCalledWith(
                CustomEventTypes.CHANGE,
                expect.any(Function)
            );
        });

        it("should destroy DOM delegating to DomManager", async () => {
            instance = await DarkModeToggle.create(element);
            await instance.destroy();
            expect(domManagerMock.destroy).toHaveBeenCalledTimes(1);
        });

        it("should remove reference to instance from element", async () => {
            instance = await DarkModeToggle.create(element);
            await instance.destroy();
            expect((element as any)._bsDarkmodeToggle).toBeUndefined();
        });

        it("should set destroyed flag", async () => {
            instance = await DarkModeToggle.create(element);
            await instance.destroy();
            expect(instance.isDestroyed()).toBe(true);
        });

        it("should not throw if already destroyed (idempotent)", async () => {
            instance = await DarkModeToggle.create(element);
            await instance.destroy();
            await expect(instance.destroy()).resolves.not.toThrow();
            expect(domManagerMock.destroy).toHaveBeenCalledTimes(1);
        });
    });
});