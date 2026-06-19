/// <reference types="jest" />
import { StateReducer } from "../../../main/ts/core/StateReducer";
import { ActionType } from "../../../main/ts/core/StateReducer.types";

const LIGHT = "light";
const DARK = "dark";

function createStateReducer(initial: boolean): StateReducer {
    return new StateReducer(initial, LIGHT, DARK);
}

describe("StateReducer", () => {
    describe(`do(${ActionType.LIGHT})`, () => {
        it("should not change state if already LIGHT", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.LIGHT);

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });

        it("should change state from DARK to LIGHT", () => {
            const reducer = createStateReducer(false);

            const result = reducer.do(ActionType.LIGHT);

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });
    });

    describe(`do(${ActionType.DARK})`, () => {
        it("should not change state if already DARK", () => {
            const reducer = createStateReducer(false);

            const result = reducer.do(ActionType.DARK);

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(false);
            expect(reducer.get().theme).toBe(DARK);
        });

        it("should change state from LIGHT to DARK", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.DARK);

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(false);
            expect(reducer.get().theme).toBe(DARK);
        });
    });

    describe(`do(${ActionType.TOGGLE})`, () => {
        it("should toggle from LIGHT to DARK", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.TOGGLE);

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(false);
            expect(reducer.get().theme).toBe(DARK);
        });

        it("should toggle from DARK to LIGHT", () => {
            const reducer = createStateReducer(false);

            const result = reducer.do(ActionType.TOGGLE);

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });
    });

    describe(`do(${ActionType.OVERRIDE})`, () => {
        it("should not change state if same isLight is provided", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.OVERRIDE, { isLight: true });

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });

        it("should change state if different isLight is provided", () => {
            const reducer = createStateReducer(false);

            const result = reducer.do(ActionType.OVERRIDE, { isLight: true });

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });

        it("should return false and not change state when payload is undefined", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.OVERRIDE);

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });

        it("should return false and not change state when payload is null", () => {
            const reducer = createStateReducer(true);

            // @ts-expect-error - Testing edge case with null payload
            const result = reducer.do(ActionType.OVERRIDE, null);

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });

        it("should return false and not change state when isLight is a string", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.OVERRIDE, { isLight: "true" as unknown as boolean });

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });

        it("should return false and not change state when isLight is a number", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.OVERRIDE, { isLight: 1 as unknown as boolean });

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });

        it("should return false and not change state when payload is missing isLight property", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.OVERRIDE, {} as { isLight: boolean });

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });

        it("should return false and not change state when isLight is not a boolean (object)", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do(ActionType.OVERRIDE, { isLight: {} as unknown as boolean });

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
            expect(reducer.get().theme).toBe(LIGHT);
        });
    });

    describe("get()", () => {
        it("should return a frozen copy of state", () => {
            const reducer = createStateReducer(true);

            const state = reducer.get();

            expect(state).toEqual({ isLight: true, theme: LIGHT });
            expect(Object.isFrozen(state)).toBe(true);
        });

        it("should not allow mutation of returned state", () => {
            const reducer = createStateReducer(true);

            const state = reducer.get();

            expect(() => {
                state.isLight = false;
            }).toThrow();
        });

        it("should return a new object each time", () => {
            const reducer = createStateReducer(true);

            const s1 = reducer.get();
            const s2 = reducer.get();

            expect(s1).not.toBe(s2);
        });
    });

    describe("edge cases", () => {
        it("should return undefined for unknown action (edge case)", () => {
            const reducer = createStateReducer(true);

            const result = reducer.do("UNKNOWN" as ActionType);

            expect(result).toBeUndefined();
        });
    });
});