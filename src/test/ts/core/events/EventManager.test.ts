/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="jest" />
import { EventManager } from "../../../../main/ts/core/events/EventManager";
import { CustomEventTypes, LegacyEventTypes } from "../../../../main/ts/core/events/Events.types";

let element: HTMLElement;
let root: HTMLElement;

const elementEventDispatchMock = jest.fn();
const rootEventDispatchMock = jest.fn();

function createEventManager():EventManager{
    return new EventManager(element, ".root");
}

describe("DomManager", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.innerHTML = "";

        element = document.createElement("div");
        document.body.appendChild(element);
        jest.spyOn(element, "dispatchEvent").mockImplementation(elementEventDispatchMock);

        root = document.createElement("div");
        root.className = "root";
        document.body.appendChild(root);
        jest.spyOn(root, "dispatchEvent").mockImplementation(rootEventDispatchMock);
    });

    describe("constructor", () => {
        it("should get all roots", () => {
            const root2 = document.createElement("div");
            root2.className = "root";
            document.body.appendChild(root2);

            const instance = createEventManager();
            expect((instance as any).roots).toStrictEqual([root, root2]);
        });
    });

    describe("dispatch(state)", () => {
        it("should dispatch all events", () => {
            const instance = createEventManager();
            instance.dispatch({isLight: true, theme: "light"});

            expect(elementEventDispatchMock).toHaveBeenCalledTimes(2);
            expect(rootEventDispatchMock).toHaveBeenCalledTimes(1);
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