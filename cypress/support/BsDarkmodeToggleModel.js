export class BsDarkmodeToggleModel {
  static BS_ATTRIBUTE = "data-bs-theme";
  static TOGGLE_SELECTOR = ".toggle";
  static TOGGLE_ON_SELECTOR = ".toggle > .toggle-group > .toggle-on";
  static TOGGLE_OFF_SELECTOR = ".toggle > .toggle-group > .toggle-off";

  static DEFAULTS = {
    state: true,
    root: ":root",
    allowsCookie: false,
    lightLabel:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M505.2 324.8l-47.73-68.78l47.75-68.81c7.359-10.62 8.797-24.12 3.844-36.06c-4.969-11.94-15.52-20.44-28.22-22.72l-82.39-14.88l-14.89-82.41c-2.281-12.72-10.76-23.25-22.69-28.22c-11.97-4.936-25.42-3.498-36.12 3.844L256 54.49L187.2 6.709C176.5-.6016 163.1-2.039 151.1 2.896c-11.92 4.971-20.4 15.5-22.7 28.19l-14.89 82.44L31.15 128.4C18.42 130.7 7.854 139.2 2.9 151.2C-2.051 163.1-.5996 176.6 6.775 187.2l47.73 68.78l-47.75 68.81c-7.359 10.62-8.795 24.12-3.844 36.06c4.969 11.94 15.52 20.44 28.22 22.72l82.39 14.88l14.89 82.41c2.297 12.72 10.78 23.25 22.7 28.22c11.95 4.906 25.44 3.531 36.09-3.844L256 457.5l68.83 47.78C331.3 509.7 338.8 512 346.3 512c4.906 0 9.859-.9687 14.56-2.906c11.92-4.969 20.4-15.5 22.7-28.19l14.89-82.44l82.37-14.88c12.73-2.281 23.3-10.78 28.25-22.75C514.1 348.9 512.6 335.4 505.2 324.8zM456.8 339.2l-99.61 18l-18 99.63L256 399.1L172.8 456.8l-18-99.63l-99.61-18L112.9 255.1L55.23 172.8l99.61-18l18-99.63L256 112.9l83.15-57.75l18.02 99.66l99.61 18L399.1 255.1L456.8 339.2zM256 143.1c-61.85 0-111.1 50.14-111.1 111.1c0 61.85 50.15 111.1 111.1 111.1s111.1-50.14 111.1-111.1C367.1 194.1 317.8 143.1 256 143.1zM256 319.1c-35.28 0-63.99-28.71-63.99-63.99S220.7 192 256 192s63.99 28.71 63.99 63.1S291.3 319.1 256 319.1z"></path></svg>',
    darkLabel:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M421.6 379.9c-.6641 0-1.35 .0625-2.049 .1953c-11.24 2.143-22.37 3.17-33.32 3.17c-94.81 0-174.1-77.14-174.1-175.5c0-63.19 33.79-121.3 88.73-152.6c8.467-4.812 6.339-17.66-3.279-19.44c-11.2-2.078-29.53-3.746-40.9-3.746C132.3 31.1 32 132.2 32 256c0 123.6 100.1 224 223.8 224c69.04 0 132.1-31.45 173.8-82.93C435.3 389.1 429.1 379.9 421.6 379.9zM255.8 432C158.9 432 80 353 80 256c0-76.32 48.77-141.4 116.7-165.8C175.2 125 163.2 165.6 163.2 207.8c0 99.44 65.13 183.9 154.9 212.8C298.5 428.1 277.4 432 255.8 432z"></path></svg>',
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
    let $toggle = $element.find(".toggle");
    return !$toggle.hasClass("off");
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
    return state ?? options.state ?? this.DEFAULTS.state;
  }

  /**
   * Get the wanted root in fonction of attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolena} root
   */
  static getRoot($element, options = {}) {
    return $element.attr("data-root") ?? options.root ?? this.DEFAULTS.root;
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
      this.DEFAULTS.lightLabel
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
      this.DEFAULTS.darkLabel
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
      this.DEFAULTS.lightColorMode
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
      this.DEFAULTS.darkColorMode
    );
  }

  /**
   * Check render state data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   */
  static checkState($element, options = {}) {
    let $toggle = cy.wrap($element).find(this.TOGGLE_SELECTOR);
    if (BsDarkmodeToggleModel.getInitialState($element, options)) {
      $toggle.should("not.have.class", "off");
    } else {
      $toggle.should("have.class", "off");
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
      .should("have.attr", this.BS_ATTRIBUTE)
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
      .find(this.TOGGLE_ON_SELECTOR)
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
      .find(this.TOGGLE_OFF_SELECTOR)
      .should(
        "have.html",
        BsDarkmodeToggleModel.getDarkLabel($element, options)
      );
  }
}
