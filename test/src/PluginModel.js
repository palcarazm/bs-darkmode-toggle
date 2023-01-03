import { BsDarkmodeToggleModel } from "../../cypress/support/BsDarkmodeToggleModel.js";
import * as purify from "../../node_modules/dompurify/dist/purify.es.js";
const DOMPurify = purify.default;

class PluginModel extends BsDarkmodeToggleModel {
  /**
   * Check render state data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   * @override
   */
  static checkState($element, options = {}) {
    let $toggle = $element.find(this.TOGGLE_SELECTOR);
    if (BsDarkmodeToggleModel.getInitialState($element, options)) {
      return !$toggle.hasClass("off");
    } else {
      return $toggle.hasClass("off");
    }
  }

  /**
   * Check render root data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   * @override
   */
  static checkRoot($element, options = {}) {
    let $root = $(
      DOMPurify.sanitize(BsDarkmodeToggleModel.getRoot($element, options))
    );

    if (!$root.is("[" + BsDarkmodeToggleModel.BS_ATTRIBUTE + "]")) {
      return false;
    }

    return (
      $root.attr(BsDarkmodeToggleModel.BS_ATTRIBUTE) ===
      (BsDarkmodeToggleModel.getState($element)
        ? BsDarkmodeToggleModel.getLightColorMode($element, options)
        : BsDarkmodeToggleModel.getDarkColorMode($element, options))
    );
  }

  /**
   * Check render light label data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   * @override
   */
  static checkLightLabel($element, options = {}) {
    let $toggleOn = $element.find(this.TOGGLE_ON_SELECTOR);

    return (
      $toggleOn.html() ===
      BsDarkmodeToggleModel.getLightLabel($element, options)
    );
  }

  /**
   * Check render dark label data attributes and options
   * @param {jQuery Element} $element
   * @param {Object} options
   * @returns {Boolean} Check PASS or FAIL
   * @override
   */
  static checkDarkLabel($element, options = {}) {
    let $toggleOff = $element.find(this.TOGGLE_OFF_SELECTOR);

    return (
      $toggleOff.html() ===
      BsDarkmodeToggleModel.getDarkLabel($element, options)
    );
  }
}

export { PluginModel as default };
