/* eslint-disable @typescript-eslint/no-explicit-any */
import { DarkModeToggle } from "../../main/ts/DarkModeToggle";
import { ActionType } from "../../main/ts/core/StateReducer.types";
import { OptionResolver } from "../../main/ts/core/OptionResolver";

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

const baseOptions = {
    state: true,
    root: ":root",
    allowCookie: true,
    lightLabel: "Light",
    darkLabel: "Dark",
    lightColorMode: "light",
    darkColorMode: "dark",
    style: "outline",
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

describe("DarkModeToggle", () => {
    let element: HTMLElement;

    beforeEach(() => {
        jest.clearAllMocks();

        element = document.createElement("div");

        resolveMock.mockReturnValue({ ...baseOptions });

        getMock.mockReturnValue({ isLight: true });
        doMock.mockReturnValue(true);
    });

    describe("constructor", () => {
        it("should initialize and call update", () => {
            new DarkModeToggle(element);

            expect(setStateMock).toHaveBeenCalledWith(true);
            expect(setCookieMock).toHaveBeenCalled();
            expect((element as any)._bsDarkmodeToggle).toBeDefined();
        });

        it("should bind onChange handler", () => {
            new DarkModeToggle(element);

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

            new DarkModeToggle(element);

            expect(setCookieMock).not.toHaveBeenCalled();
        });
    });

    describe("applyPreferredScheme()", () => {
        it("should apply dark from cookie", () => {
            getCookieMock.mockReturnValue("dark");

            new DarkModeToggle(element);

            expect(doMock).toHaveBeenCalledWith(ActionType.DARK);
        });

        it("should apply light from cookie", () => {
            getCookieMock.mockReturnValue("light");

            new DarkModeToggle(element);

            expect(doMock).toHaveBeenCalledWith(ActionType.LIGHT);
        });

        it("should skip applyPreferredScheme if cookies disabled", () => {
            resolveMock.mockReturnValue({ ...baseOptions, allowCookie: false });

            new DarkModeToggle(element);

            expect(getCookieMock).not.toHaveBeenCalled();
        });
    });

    describe("DOM change event", () => {
        it("should handle DOM change event", () => {
            let handler: any;

            onChangeMock.mockImplementation((cb) => {
                handler = cb;
            });

            new DarkModeToggle(element);

            const preventDefault = jest.fn();

            handler({ preventDefault });

            expect(doMock).toHaveBeenCalledWith(ActionType.TOGGLE);
            expect(setCookieMock).toHaveBeenCalled();
            expect(preventDefault).toHaveBeenCalled();
        });
    });
});