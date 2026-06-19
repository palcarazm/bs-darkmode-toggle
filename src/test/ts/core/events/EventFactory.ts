/// <reference types="jest" />
import { EventFactory } from "../../../../main/ts/core/events/EventFactory";

let element: HTMLElement;
let root: HTMLElement;

describe("EventFactory", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        element = document.createElement("div");

        root = document.createElement("div");
        root.className = "root";
    });

    describe("createEventDetail(state, element, roots)", () => {
        it("should create event detail", () => {
            const eventDetail = EventFactory.createEventDetail({ isLight: true, theme: "light" }, element, [root]);
            expect(eventDetail).toEqual({ isLight: true, theme: "light", source: element, roots: [root] });
        });
    });

    describe("createPrefixedEvent(state, element, roots)", () => {
        it("should create a prefixed custom event with correct type and detail", () => {
            const event = EventFactory.createPrefixedEvent({ isLight: false, theme: "dark" }, element, [root]);
            expect(event).toBeInstanceOf(CustomEvent);
            expect(event.type).toBe("darkmode:change");
            expect(event.detail).toEqual({ isLight: false, theme: "dark", source: element, roots: [root] });
        });
    });

    describe("createLegacyEvent()", () => {
        it("should create a legacy custom event with correct type", () => {
            const event = EventFactory.createLegacyEvent();
            expect(event).toBeInstanceOf(Event);
            expect(event.type).toBe("change");
        });
    });
});