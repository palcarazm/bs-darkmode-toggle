class DarkmodeToggleComponent {
    static TOGGLE_SELECTOR = ".toggle";
    static TOGGLE_INPUT_SELECTOR = ".toggle > input";
    static TOGGLE_ON_SELECTOR = ".toggle > .toggle-group > .toggle-on";
    static TOGGLE_OFF_SELECTOR = ".toggle > .toggle-group > .toggle-off";
    static BS_ATTRIBUTE = "data-bs-theme";
    static STORAGE_KEY = "bs-darkmode-theme";

    static DEFAULTS = {
        state: true,
        root: ":root",
        lightLabel: "<i class=\"bs-darkmode-toggle sun\"></i>",
        darkLabel: "<i class=\"bs-darkmode-toggle moon\"></i>",
        lightColorMode: "light",
        darkColorMode: "dark",
        style: "outline-secondary",
    };

    static getInitialState($element, options = {}) {
        return cy.wrap($element).then(($el) => {
            const dataState = $el.attr("data-state");
            if (dataState === "light") return true;
            if (dataState === "dark") return false;
            return options.state ?? this.DEFAULTS.state;
        });
    }

    static getRoot($element, options = {}) {
        return cy.wrap($element).then(($el) => {
            return $el.attr("data-root") ?? options.root ?? this.DEFAULTS.root;
        });
    }

    static getLightLabel($element, options = {}) {
        return cy.wrap($element).then(($el) => {
            return (
                $el.attr("data-light-label") ??
                options.lightLabel ??
                this.DEFAULTS.lightLabel
            );
        });
    }

    static getDarkLabel($element, options = {}) {
        return cy.wrap($element).then(($el) => {
            return (
                $el.attr("data-dark-label") ??
                options.darkLabel ??
                this.DEFAULTS.darkLabel
            );
        });
    }

    static getLightColorMode($element, options = {}) {
        return cy.wrap($element).then(($el) => {
            return (
                $el.attr("data-light-color-mode") ??
                options.lightColorMode ??
                this.DEFAULTS.lightColorMode
            );
        });
    }

    static getDarkColorMode($element, options = {}) {
        return cy.wrap($element).then(($el) => {
            return (
                $el.attr("data-dark-color-mode") ??
                options.darkColorMode ??
                this.DEFAULTS.darkColorMode
            );
        });
    }

    static getStyle($element, options = {}) {
        return cy.wrap($element).then(($el) => {
            return (
                $el.attr("data-style") ?? options.style ?? this.DEFAULTS.style
            );
        });
    }

    static getState($element) {
        return cy
            .wrap($element)
            .find(this.TOGGLE_INPUT_SELECTOR)
            .then(($input) => $input.is(":checked"));
    }

    static checkState($element, options = {}) {
        const $toggle = cy.wrap($element).find(this.TOGGLE_SELECTOR);

        this.getInitialState($element, options).then((initialState) => {
            if (initialState) {
                $toggle.should("not.have.class", "off");
            } else {
                $toggle.should("have.class", "off");
            }
        });
    }

    static checkCurrentState($element, expectedLight) {
        const $toggle = cy.wrap($element).find(this.TOGGLE_SELECTOR);

        if (expectedLight) {
            $toggle.should("not.have.class", "off");
            cy.wrap($element)
                .find(this.TOGGLE_INPUT_SELECTOR)
                .should("be.checked");
        } else {
            $toggle.should("have.class", "off");
            cy.wrap($element)
                .find(this.TOGGLE_INPUT_SELECTOR)
                .should("not.be.checked");
        }
    }

    static checkRoot($element, options = {}) {
        const container = {};
        this.getRoot($element, options)
            .then((root) => {
                container.root = root;
                return this.getState($element);
            })
            .then((state) => {
                container.state = state;
                return this.getLightColorMode($element, options);
            })
            .then((lightMode) => {
                container.lightMode = lightMode;
                return this.getDarkColorMode($element, options);
            })
            .then((darkMode) => {
                container.darkMode = darkMode;
                return container;
            })
            .then(({ root, state, lightMode, darkMode }) => {
                const expectedMode = state ? lightMode : darkMode;

                cy.get(root)
                    .should("have.attr", this.BS_ATTRIBUTE)
                    .and("eq", expectedMode);
            });
    }

    static checkLightLabel($element, options = {}) {
        this.getLightLabel($element, options).then((label) => {
            cy.wrap($element)
                .find(this.TOGGLE_ON_SELECTOR)
                .should("have.html", label);
        });
    }

    static checkDarkLabel($element, options = {}) {
        this.getDarkLabel($element, options).then((label) => {
            cy.wrap($element)
                .find(this.TOGGLE_OFF_SELECTOR)
                .should("have.html", label);
        });
    }

    static checkStyle($element, options = {}) {
        this.getStyle($element, options).then((style) => {
            cy.wrap($element)
                .find(this.TOGGLE_SELECTOR)
                .should("have.class", `btn-${style}`);
        });
    }

    static setLight($element, pluginInterface, silent = true) {
        this.invokeMethod($element, pluginInterface, "light", silent);
    }

    static setDark($element, pluginInterface, silent = true) {
        this.invokeMethod($element, pluginInterface, "dark", silent);
    }

    static toggle($element, pluginInterface, silent = true) {
        this.invokeMethod($element, pluginInterface, "toggle", silent);
    }

    static allowCookie($element, pluginInterface) {
        this.invokeMethod($element, pluginInterface, "allowCookie");
    }

    static denyCookie($element, pluginInterface) {
        this.invokeMethod($element, pluginInterface, "denyCookie");
    }

    static invokeMethod($element, pluginInterface, method, silent) {
        const args = silent !== undefined ? [method, silent] : [method];

        if (pluginInterface === "ecmas") {
            cy.wrap($element).then(($el) => $el[0].bsDarkmodeToggle(...args));
        } else {
            cy.wrap($element).invoke("bsDarkmodeToggle", ...args);
        }
    }
}

export default DarkmodeToggleComponent;
