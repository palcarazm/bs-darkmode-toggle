import { PageModel } from "../app/PageModel.js";
import PluginModel from "../app/PluginModel.js";
import { TEST_CONSTANTS } from "../common/constants.js";

export class TestRunner {
    static runAllTests() {
        $(PageModel.TEST_SELECTOR).each((_, test) => {
            const $test = $(test);
            const $element = $test.find(PageModel.TEST_ELEMENT_SELECTOR);
            const options = this.#getOptions($test);
            const $badge = this.#createBadge();

            this.#runChecks($element, $badge, options);
            $test.find(`.${TEST_CONSTANTS.TEST_RESULT_CLASS}`).append($badge);
        });
    }

    static #getOptions($test) {
        const optionsText = $test
            .find(`.${TEST_CONSTANTS.TEST_OPTIONS_CLASS}`)
            .text();
        return optionsText ? JSON.parse(optionsText) : {};
    }

    static #createBadge() {
        return PageModel.BADGE.clone();
    }

    static #runChecks($element, $badge, options) {
        const checks = [
            {
                name: "State",
                fn: () => PluginModel.checkState($element, options),
            },
            {
                name: "Root",
                fn: () => PluginModel.checkRoot($element, options),
            },
            {
                name: "Light Label",
                fn: () => PluginModel.checkLightLabel($element, options),
            },
            {
                name: "Dark Label",
                fn: () => PluginModel.checkDarkLabel($element, options),
            },
            {
                name: "Style",
                fn: () => PluginModel.checkStyle($element, options),
            },
        ];

        checks.forEach((check) => {
            if (check.fn()) {
                this.#addResultToBadge($badge, check.name, true);
            } else {
                this.#addResultToBadge($badge, check.name, false);
            }
        });
    }

    static #addResultToBadge($badge, testName, passed) {
        const $span = passed
            ? $("<span>").text(`${testName} PASS`)
            : $('<span class="fw-bold">').text(`${testName} FAIL`);

        $badge.append($span);

        if (!passed) {
            $badge.addClass(PageModel.BADGE_FAIL_CLASS);
            $badge.removeClass(PageModel.BADGE_PASS_CLASS);
        }
    }
}
