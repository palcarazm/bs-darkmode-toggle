import DarkmodeToggleComponent from "../../../support/page-objects/DarkmodeToggleComponent";

const checks = Object.freeze([
    {
        name: "state",
        test: ($element, options) =>
            DarkmodeToggleComponent.checkState($element, options),
    },
    {
        name: "root",
        test: ($element, options) =>
            DarkmodeToggleComponent.checkRoot($element, options),
    },
    {
        name: "lightLabel",
        test: ($element, options) =>
            DarkmodeToggleComponent.checkLightLabel($element, options),
    },
    {
        name: "darkLabel",
        test: ($element, options) =>
            DarkmodeToggleComponent.checkDarkLabel($element, options),
    },
    {
        name: "style",
        test: ($element, options) =>
            DarkmodeToggleComponent.checkStyle($element, options),
    },
]);

export default checks;
