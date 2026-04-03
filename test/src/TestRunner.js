import * as pagemodel from "./PageModel.js";
const PAGEMODEL = pagemodel.default;

import * as pluginmodel from "./PluginModel.js";
const PLUGIN = pluginmodel.default;

export default class TestRunner {
    /**
   * Run data attributes test
   * @static
   */
    static dataAttributesTest() {
        $(PAGEMODEL.TEST_SELECTOR).each(function () {
            let $badge = PAGEMODEL.BADGE.clone();
            let $element = $(this).find(PAGEMODEL.TEST_ELEMENT_SELECTOR);

            if(PLUGIN.checkState($element, options)) {
                TestRunner.#addSuccessToResultBadge($badge, "State");
            } else {
                TestRunner.#addFailToResultBadge($badge, "State");
            }

            if(PLUGIN.checkRoot($element, options)) {
                TestRunner.#addSuccessToResultBadge($badge, "Root");
            } else {
                TestRunner.#addFailToResultBadge($badge, "Root");
            }

            if(PLUGIN.checkLightLabel($element, options)) {
                TestRunner.#addSuccessToResultBadge($badge, "Light Label");
            } else {
                TestRunner.#addFailToResultBadge($badge, "Light Label");
            }

            if(PLUGIN.checkDarkLabel($element, options)) {
                TestRunner.#addSuccessToResultBadge($badge, "Dark Label");
            } else {
                TestRunner.#addFailToResultBadge($badge, "Dark Label");
            }

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

            if(PLUGIN.checkState($element, options)) {
                TestRunner.#addSuccessToResultBadge($badge, "State");
            } else {
                TestRunner.#addFailToResultBadge($badge, "State");
            }

            if(PLUGIN.checkRoot($element, options)) {
                TestRunner.#addSuccessToResultBadge($badge, "Root");
            } else {
                TestRunner.#addFailToResultBadge($badge, "Root");
            }

            if(PLUGIN.checkLightLabel($element, options)) {
                TestRunner.#addSuccessToResultBadge($badge, "Light Label");
            } else {
                TestRunner.#addFailToResultBadge($badge, "Light Label");
            }

            if(PLUGIN.checkDarkLabel($element, options)) {
                TestRunner.#addSuccessToResultBadge($badge, "Dark Label");
            } else {
                TestRunner.#addFailToResultBadge($badge, "Dark Label");
            }

            $(this).find(PAGEMODEL.BADGE_CONTAINER_SELECTOR).append($badge);
        });
    }

    /**
     * Add Success Result to the badge
     * @param {jQuery Element} $bagde
     * @param {String} test
     * @param {Boolean} result
     * @private
     */
    static #addSuccessToResultBadge($badge, test) {
        $badge.append($("<span>/span>").text(test + " PASS"));
    }

    /**
     * Add Fail Result to the badge
     * @param {jQuery Element} $bagde
     * @param {String} test
     * @param {Boolean} result
     * @private
     */
    static #addFailToResultBadge($badge, test) {
        $badge.append($('<span class="fw-bold"></span>').text(test + " FAIL"));
        $badge.addClass(PAGEMODEL.BADGE_FAIL_CLASS);
        $badge.removeClass(PAGEMODEL.BADGE_PASS_CLASS);
    }
}
