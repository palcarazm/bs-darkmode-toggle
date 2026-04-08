/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="jest" />
import { DomManager } from "../../../../main/ts/core/dom/DomManager";
import { Layout, ResolvedOptions, StorageType } from "../../../../main/ts/core/OptionResolver.types";
import { AbstractLayout } from "../../../../main/ts/core/dom/AbstractLayout";
import { ButtonLayout } from "../../../../main/ts/core/dom/layouts/ButtonLayout";
import { ToggleLayout } from "../../../../main/ts/core/dom/layouts/ToggleLayout";

let capturedHandler: (e: Event) => void;
const mockSetState: jest.Mock = jest.fn();
const mockOnChange: jest.Mock = jest.fn()
    .mockImplementation((handler) => {capturedHandler = handler;});
const mockOnChangeHandler = jest.fn();

const mockLayout: Partial<AbstractLayout> = {
    setState: mockSetState,
    onChange: mockOnChange,
    roots: [document.createElement("div"), document.createElement("span")],
};

jest.mock("../../../../main/ts/core/dom/layouts/ButtonLayout", () => {
    return {
        ButtonLayout: jest.fn().mockImplementation(() => mockLayout),
    };
});

jest.mock("../../../../main/ts/core/dom/layouts/ToggleLayout", () => {
    return {
        ToggleLayout: jest.fn().mockImplementation(() => mockLayout),
    };
});

const layouts = [Layout.BUTTON, Layout.TOGGLE];
const layoutImplementations = [ButtonLayout, ToggleLayout];

function layoutResolver(layout: Layout):typeof AbstractLayout{
    switch (layout) {
    case Layout.BUTTON:
        return ButtonLayout;
    case Layout.TOGGLE:
        return ToggleLayout;
    }
}

let element: HTMLElement;
const baseOptions: ResolvedOptions = {
    state: true,
    root: ".root",
    storage: StorageType.NONE,
    lightLabel: "Light",
    darkLabel: "Dark",
    lightColorMode: "light",
    darkColorMode: "dark",
    style: "outline-secondary",
    layout: Layout.TOGGLE,
};

function createDomManager(layout:Layout):DomManager{
    return new DomManager(element,{...baseOptions, layout: layout}, mockOnChangeHandler);
}

describe("DomManager", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        capturedHandler = () => {};
        (mockLayout as any).roots = [document.createElement("div"), document.createElement("span")];

        element = document.createElement("div");
    });

    describe("constructor", () => {
        it.each(layouts)("should create DomManager with %s layout", (layout) => {
            const _domManager = createDomManager(layout);
            const wantedLayout = layoutResolver(layout);

            expect(wantedLayout).toHaveBeenCalled();

            layoutImplementations
                .filter((implementation) => implementation !== wantedLayout)
                .forEach((implementation)=> expect(implementation).not.toHaveBeenCalled());
        });

        it("should default to ToggleLayout for unknown storage type", () => {
            // @ts-expect-error - Testing invalid type
            const _domManager = createDomManager("invalid");
            expect(ToggleLayout).toHaveBeenCalled();
        });
    });

    describe("setState", () => {
        it.each(layouts)("should delegate setState on layout %s", (layout) => {
            const domManager = createDomManager(layout);
            domManager.setState({isLight:true, theme:"light"});
            expect(mockSetState).toHaveBeenCalledWith({isLight:true, theme:"light"});
        });
    });

    describe("roots", () => {
        it.each(layouts)("should delegate roots on layout %s", (layout) => {
            const domManager = createDomManager(layout);
            expect(domManager.roots).toEqual(mockLayout.roots);
        });
    });

    describe("onChange()", () => {
        it.each(layouts)("should call onChange handler when layout %s triggers change event", (layout) => {
            
            const _domManager = createDomManager(layout);
            const mockEvent = new Event("change");
            capturedHandler(mockEvent);
            
            expect(mockOnChangeHandler).toHaveBeenCalledTimes(1);
            expect(mockOnChangeHandler).toHaveBeenCalledWith(mockEvent);
        });
    });
});