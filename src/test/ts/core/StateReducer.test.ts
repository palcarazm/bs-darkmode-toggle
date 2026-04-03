import { StateReducer } from "../../../main/ts/core/StateReducer";
import { ActionType } from "../../../main/ts/core/StateReducer.types";

describe("StateReducer", () => {
    describe(`do(${ActionType.LIGHT})`, () => {
        it("should not change state if already LIGHT", () => {
            const reducer = new StateReducer(true);

            const result = reducer.do(ActionType.LIGHT);

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(true);
        });

        it("should change state from DARK to LIGHT", () => {
            const reducer = new StateReducer(false);

            const result = reducer.do(ActionType.LIGHT);

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(true);
        });
    });

    describe(`do(${ActionType.DARK})`, () => {
        it("should not change state if already DARK", () => {
            const reducer = new StateReducer(false);

            const result = reducer.do(ActionType.DARK);

            expect(result).toBe(false);
            expect(reducer.get().isLight).toBe(false);
        });

        it("should change state from LIGHT to DARK", () => {
            const reducer = new StateReducer(true);

            const result = reducer.do(ActionType.DARK);

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(false);
        });
    });

    describe(`do(${ActionType.TOGGLE})`, () => {
        it("should toggle from LIGHT to DARK", () => {
            const reducer = new StateReducer(true);

            const result = reducer.do(ActionType.TOGGLE);

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(false);
        });

        it("should toggle from DARK to LIGHT", () => {
            const reducer = new StateReducer(false);

            const result = reducer.do(ActionType.TOGGLE);

            expect(result).toBe(true);
            expect(reducer.get().isLight).toBe(true);
        });
    });

    describe("get()", () => {
        it("should return a frozen copy of state", () => {
            const reducer = new StateReducer(true);

            const state = reducer.get();

            expect(state).toEqual({ isLight: true });
            expect(Object.isFrozen(state)).toBe(true);
        });

        it("should not allow mutation of returned state", () => {
            const reducer = new StateReducer(true);

            const state = reducer.get();

            expect(() => {
                state.isLight = false;
            }).toThrow();
        });

        it("should return a new object each time", () => {
            const reducer = new StateReducer(true);

            const s1 = reducer.get();
            const s2 = reducer.get();

            expect(s1).not.toBe(s2);
        });
    });

    describe("edge cases", () => {
        it("should return undefined for unknown action (edge case)", () => {
            const reducer = new StateReducer(true);

            const result = reducer.do("UNKNOWN" as ActionType);

            expect(result).toBeUndefined();
        });
    });
});