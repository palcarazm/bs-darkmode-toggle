import { PageModel } from "../app/PageModel.js";
import { TEST_CONSTANTS } from "../common/constants.js";

export class BaseLoader {
    load(testCases, interface_) {
        globalThis.window.matchMedia = (_query) => ({
            matches: false,
            addEventListener: () => {},
            removeEventListener: () => {},
        });
    }

    buildElement(testCase, id) {
        const $element = PageModel.TEST_ELEMENT.clone().attr(
            "data-root",
            `#${id}`
        );

        testCase.options?.forEach((opt) => {
            if (opt.attr) $element.attr(opt.attr, opt.value);
        });

        return $element;
    }

    buildContainer(id, $element, hasOptionsColumn = true) {
        const $container = PageModel.TEST_CONTAINER.clone().attr("id", id);
        const $row = $('<div class="row mb-3">');

        $row.append(PageModel.COL.clone().append($element));

        if (hasOptionsColumn) {
            $row.append(
                PageModel.COL.clone().addClass(
                    TEST_CONSTANTS.TEST_OPTIONS_CLASS
                )
            );
        }

        $row.append(
            PageModel.COL.clone().addClass(TEST_CONSTANTS.TEST_RESULT_CLASS)
        );

        return $container.append($row);
    }

    appendToMain(title, $container) {
        PageModel.MAIN.append(
            PageModel.TEST_TITLE.clone().html(title),
            $container
        );
    }
}
