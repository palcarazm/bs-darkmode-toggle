import * as purify from "../../node_modules/dompurify/dist/purify.es.js";
const DOMPurify = purify.default;

import * as pagemodel from "./PageModel.js";
const PAGEMODEL = pagemodel.default;

import * as pluginmodel from "./PluginModel.js";
const PLUGIN = pluginmodel.default;

class TestRunner {
  /**
   * Run data attributes test
   * @static
   */
  static dataAttributesTest() {
    $(PAGEMODEL.TEST_SELECTOR).each(function () {
      let $badge = PAGEMODEL.BADGE.clone();
      let $element = $(this).find(PAGEMODEL.TEST_ELEMENT_SELECTOR);

      TestRunner.#addToResultBadge(
        $badge,
        "State",
        PLUGIN.checkState($element)
      );

      TestRunner.#addToResultBadge($badge, "Root", PLUGIN.checkRoot($element));

      TestRunner.#addToResultBadge(
        $badge,
        "Light Label",
        PLUGIN.checkLightLabel($element)
      );

      TestRunner.#addToResultBadge(
        $badge,
        "Dark Label",
        PLUGIN.checkDarkLabel($element)
      );

      $(this).find(PAGEMODEL.BADGE_CONTAINER_SELECTOR).append($badge);
    });
  }

  /**
   * Run data options test
   * @static
   */
  static dataOptionsTest() {
    $(PAGEMODEL.TEST_SELECTOR).each(function () {
      let $badge = PAGEMODEL.BADGE.clone();
      let $element = $(this).find(PAGEMODEL.TEST_ELEMENT_SELECTOR);
      let options = PAGEMODEL.getOptions($(this));

      TestRunner.#addToResultBadge(
        $badge,
        "State",
        PLUGIN.checkState($element, options)
      );

      TestRunner.#addToResultBadge(
        $badge,
        "Root",
        PLUGIN.checkRoot($element, options)
      );

      TestRunner.#addToResultBadge(
        $badge,
        "Light Label",
        PLUGIN.checkLightLabel($element, options)
      );

      TestRunner.#addToResultBadge(
        $badge,
        "Dark Label",
        PLUGIN.checkDarkLabel($element, options)
      );

      $(this).find(PAGEMODEL.BADGE_CONTAINER_SELECTOR).append($badge);
    });
  }

  /**
   * Add Result to the badge
   * @param {jQuery Element} $bagde
   * @param {String} test
   * @param {Boolean} result
   * @private
   */
  static #addToResultBadge($badge, test, result) {
    if (result) {
      $badge.append($("<span>/span>").text(test + " PASS"));
    } else {
      $badge.append($('<span class="fw-bold"></span>').text(test + " FAIL"));
      $badge.addClass(PAGEMODEL.BADGE_FAIL_CLASS);
      $badge.removeClass(PAGEMODEL.BADGE_PASS_CLASS);
    }
  }
}

export { TestRunner as default };
