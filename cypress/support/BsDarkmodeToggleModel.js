export class BsDarkmodeToggleModel {
    static BS_ATTRIBUTE = "data-bs-theme";
    static COOKIE_NAME = "bs-darkmode-toggle-color-scheme";

    static TOGGLE_SELECTOR = ".toggle";
    static TOGGLE_ON_SELECTOR = ".toggle > .toggle-group > .toggle-on";
    static TOGGLE_OFF_SELECTOR = ".toggle > .toggle-group > .toggle-off";
    static TOGGLE_INPUT_SELECTOR = ".toggle > input";

    static DEFAULTS = {
        state: true,
        root: ":root",
        allowCookie: false,
        lightLabel: "Light",
        darkLabel: "Dark",
        lightColorMode: "light",
        darkColorMode: "dark",
        style: "outline-secondary",
    };

    /**
   * Get the current state
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolena} State
   */
    static getState($element) {
        return $element
            .find(BsDarkmodeToggleModel.TOGGLE_INPUT_SELECTOR)
            .is(":checked");
    }

    /**
   * Get the wanted state in fonction of attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolena} State
   */
    static getInitialState($element, options = {}) {
        let state;
        if ($element.is("[data-state]")) {
            switch ($element.attr("data-state")) {
            case "light":
                state = true;
                break;
            case "dark":
                state = false;
                break;
            default:
                state = null;
                break;
            }
        }
        return state ?? options.state ?? BsDarkmodeToggleModel.DEFAULTS.state;
    }

    /**
   * Get the wanted root in fonction of attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolena} root
   */
    static getRoot($element, options = {}) {
        return (
            $element.attr("data-root") ??
      options.root ??
      BsDarkmodeToggleModel.DEFAULTS.root
        );
    }

    /**
   * Get the wanted light label in fonction of attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolena} light label
   */
    static getLightLabel($element, options = {}) {
        return (
            $element.attr("data-lightLabel") ??
      options.lightLabel ??
      BsDarkmodeToggleModel.DEFAULTS.lightLabel
        );
    }

    /**
   * Get the wanted dark label in fonction of attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolena} dark label
   */
    static getDarkLabel($element, options = {}) {
        return (
            $element.attr("data-darkLabel") ??
      options.darkLabel ??
      BsDarkmodeToggleModel.DEFAULTS.darkLabel
        );
    }

    /**
   * Get the wanted light color mode in fonction of attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolena} light color mode
   */
    static getLightColorMode($element, options = {}) {
        return (
            $element.attr("data-lightColorMode") ??
      options.lightColorMode ??
      BsDarkmodeToggleModel.DEFAULTS.lightColorMode
        );
    }

    /**
   * Get the wanted dark color mode in fonction of attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolena} dark color mode
   */
    static getDarkColorMode($element, options = {}) {
        return (
            $element.attr("data-darkColorMode") ??
      options.darkColorMode ??
      BsDarkmodeToggleModel.DEFAULTS.darkColorMode
        );
    }

    /**
   * Check render state data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   */
    static checkState($element, options = {}) {
        let $toggle = cy.wrap($element).find(BsDarkmodeToggleModel.TOGGLE_SELECTOR);
        if (BsDarkmodeToggleModel.getInitialState($element, options)) {
            $toggle.should("not.have.class", "off");
        } else {
            $toggle.should("have.class", "off");
        }
    }

    /**
   * Check current state data attributes and options
   * @param {jQuery Element} $element
   * @param {Boolean} state Light or Dark
   * @returns {Boolean} Check PASS or FAIL
   */
    static checkCurrentState($element, state) {
        let $toggle = cy.wrap($element).find(BsDarkmodeToggleModel.TOGGLE_SELECTOR);
        if (state) {
            $toggle.should("not.have.class", "off");
            cy.wrap($element)
                .find(BsDarkmodeToggleModel.TOGGLE_INPUT_SELECTOR)
                .should("be.checked");
        } else {
            $toggle.should("have.class", "off");
            cy.wrap($element)
                .find(BsDarkmodeToggleModel.TOGGLE_INPUT_SELECTOR)
                .should("not.be.checked");
        }
    }

    /**
   * Check render root data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   */
    static checkRoot($element, options = {}) {
        let $root = cy.get(BsDarkmodeToggleModel.getRoot($element, options));
        $root
            .should("have.attr", BsDarkmodeToggleModel.BS_ATTRIBUTE)
            .and(
                "eq",
                BsDarkmodeToggleModel.getState($element)
                    ? BsDarkmodeToggleModel.getLightColorMode($element, options)
                    : BsDarkmodeToggleModel.getDarkColorMode($element, options)
            );
    }

    /**
   * Check render light label data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   */
    static checkLightLabel($element, options = {}) {
        cy.wrap($element)
            .find(BsDarkmodeToggleModel.TOGGLE_ON_SELECTOR)
            .should(
                "have.html",
                BsDarkmodeToggleModel.getLightLabel($element, options)
            );
    }

    /**
   * Check render dark label data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   */
    static checkDarkLabel($element, options = {}) {
        cy.wrap($element)
            .find(BsDarkmodeToggleModel.TOGGLE_OFF_SELECTOR)
            .should(
                "have.html",
                BsDarkmodeToggleModel.getDarkLabel($element, options)
            );
    }

    /**
   * Set Light Color Scheme
   * @param {jQuery Element} $element
   * @param {String} pluginInterface
   * @static
   */
    static setLight($element, pluginInterface) {
        switch (pluginInterface.toUpperCase()) {
        case "ECMAS":
            $element.get(0).bsDarkmodeToggle("light", true);
            break;
        case "JQUERY":
            cy.wrap($element).invoke("bsDarkmodeToggle", "light", true);
            break;

        default:
            throw new DOMException(
                "Unknown interface: " + pluginInterface,
                "NotSupportedError"
            );
        }

        BsDarkmodeToggleModel.checkCurrentState($element, true);
    }

    /**
   * Set Dark Color Scheme
   * @param {jQuery Element} $element
   * @param {String} pluginInterface
   * @static
   */
    static setDark($element, pluginInterface) {
        switch (pluginInterface.toUpperCase()) {
        case "ECMAS":
            $element.get(0).bsDarkmodeToggle("dark", true);
            break;
        case "JQUERY":
            cy.wrap($element).invoke("bsDarkmodeToggle", "dark", true);
            break;

        default:
            throw new DOMException(
                "Unknown interface: " + pluginInterface,
                "NotSupportedError"
            );
        }
        BsDarkmodeToggleModel.checkCurrentState($element, false);
    }
}
