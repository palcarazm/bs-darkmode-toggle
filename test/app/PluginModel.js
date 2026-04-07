import { TEST_CONSTANTS } from "../common/constants.js";

export default class PluginModel {
    static TOGGLE_SELECTOR = ".toggle";
    static TOGGLE_INPUT_SELECTOR = ".toggle > input";
    static TOGGLE_ON_SELECTOR = ".toggle > .toggle-group > .toggle-on";
    static TOGGLE_OFF_SELECTOR = ".toggle > .toggle-group > .toggle-off";
    static BS_ATTRIBUTE = "data-bs-theme";

    static getState($element) {
        return $element.find(this.TOGGLE_INPUT_SELECTOR).is(":checked");
    }

    static getInitialState($element, options = {}) {
        const dataState = $element.attr("data-state");
        if (dataState === "light") return true;
        if (dataState === "dark") return false;
        return options.state ?? TEST_CONSTANTS.DEFAULTS.state;
    }

    static getRoot($element, options = {}) {
        return $element.attr("data-root") ?? options.root ?? TEST_CONSTANTS.DEFAULTS.root;
    }

    static getLightLabel($element, options = {}) {
        return $element.attr("data-light-label") ?? options.lightLabel ?? TEST_CONSTANTS.DEFAULTS.lightLabel;
    }

    static getDarkLabel($element, options = {}) {
        return $element.attr("data-dark-label") ?? options.darkLabel ?? TEST_CONSTANTS.DEFAULTS.darkLabel;
    }

    static getLightColorMode($element, options = {}) {
        return $element.attr("data-light-color-mode") ?? options.lightColorMode ?? TEST_CONSTANTS.DEFAULTS.lightColorMode;
    }

    static getDarkColorMode($element, options = {}) {
        return $element.attr("data-dark-color-mode") ?? options.darkColorMode ?? TEST_CONSTANTS.DEFAULTS.darkColorMode;
    }

    static getStyle($element, options = {}) {
        return $element.attr("data-style") ?? options.style ?? TEST_CONSTANTS.DEFAULTS.style;
    }

    static checkState($element, options = {}) {
        const $toggle = $element.find(this.TOGGLE_SELECTOR);
        const initialState = this.getInitialState($element, options);
        return initialState ? !$toggle.hasClass("off") : $toggle.hasClass("off");
    }

    static checkRoot($element, options = {}) {
        const $root = $(this.getRoot($element, options));
        if (!$root.is(`[${this.BS_ATTRIBUTE}]`)) return false;

        const expectedMode = this.getState($element)
            ? this.getLightColorMode($element, options)
            : this.getDarkColorMode($element, options);

        return $root.attr(this.BS_ATTRIBUTE) === expectedMode;
    }

    static checkLightLabel($element, options = {}) {
        const $toggleOn = $element.find(this.TOGGLE_ON_SELECTOR);
        return $toggleOn.html() === this.getLightLabel($element, options);
    }

    static checkDarkLabel($element, options = {}) {
        const $toggleOff = $element.find(this.TOGGLE_OFF_SELECTOR);
        return $toggleOff.html() === this.getDarkLabel($element, options);
    }

    static checkStyle($element, options = {}) {
        const $toggle = $element.find(this.TOGGLE_SELECTOR);
        return $toggle.hasClass(`btn-${this.getStyle($element, options)}`);
    }
}