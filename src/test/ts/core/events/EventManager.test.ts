/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="jest" />
import { EventManager } from "../../../../main/ts/core/events/EventManager";
import { CustomEventTypes, LegacyEventTypes } from "../../../../main/ts/core/events/Events.types";

let element: HTMLElement;
let root: HTMLElement;

const elementEventDispatchMock = jest.fn();
const rootEventDispatchMock = jest.fn();
const mockRootsFn = jest.fn(() => [root]);

function createEventManager():EventManager{
    return new EventManager(element, mockRootsFn);
}

describe("EventManager", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        element = document.createElement("div");
        jest.spyOn(element, "dispatchEvent").mockImplementation(elementEventDispatchMock);

        root = document.createElement("div");
        root.className = "root";
        jest.spyOn(root, "dispatchEvent").mockImplementation(rootEventDispatchMock);
    });

    describe("dispatch(state)", () => {
        it("should dispatch all events", () => {
            const instance = createEventManager();
            instance.dispatch({isLight: true, theme: "light"});

            expect(elementEventDispatchMock).toHaveBeenCalledTimes(2);
            expect(rootEventDispatchMock).toHaveBeenCalledTimes(1);
        });

        it("should get all roots", () => {
            const instance = createEventManager();
            instance.dispatch({ isLight: true, theme: "light" });
            expect(mockRootsFn).toHaveBeenCalled();
        });
    });

    describe("dispatchChangeEvent(source)", () => {
        it("should dispatch change event from source", () => {
            (EventManager as any).dispatchChangeEvent(element);

            const expectedEvent = { type: LegacyEventTypes.CHANGE, bubbles: true };

            expect(elementEventDispatchMock).toHaveBeenCalledTimes(1);
            expect(elementEventDispatchMock).toHaveBeenCalledWith(expect.any(Event));
            expect(elementEventDispatchMock).toHaveBeenCalledWith(expect.objectContaining(expectedEvent));
        });
    });

    describe("dispatchDarkModeChangeEvent(isLight, theme, source, roots)", () => {
        it("should dispatch change event from source", () => {
            (EventManager as any).dispatchDarkModeChangeEvent(true, "light", element, [root]);

            const expectedEvent = { type: CustomEventTypes.CHANGE, detail: { isLight: true, theme: "light", source: element, roots: [root] }, bubbles: true };

            expect(elementEventDispatchMock).toHaveBeenCalledTimes(1);
            expect(elementEventDispatchMock).toHaveBeenCalledWith(expect.any(Event));
            expect(elementEventDispatchMock).toHaveBeenCalledWith(expect.objectContaining(expectedEvent));

            expect(rootEventDispatchMock).toHaveBeenCalledTimes(1);
            expect(rootEventDispatchMock).toHaveBeenCalledWith(expect.any(Event));
            expect(rootEventDispatchMock).toHaveBeenCalledWith(expect.objectContaining(expectedEvent));
        });
    });
});