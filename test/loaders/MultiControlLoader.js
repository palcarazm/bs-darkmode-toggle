import { BaseLoader } from "./BaseLoader.js";
import { TEST_CONSTANTS } from "../common/constants.js";
import { PageModel } from "../app/PageModel.js";

export class MultiControlLoader extends BaseLoader {
    load(_testCases, interface_) {
        super.load(_testCases, interface_);

        const id = "multi_control";
        const $container = PageModel.TEST_CONTAINER.clone().attr("id", id);

        const $element1 = PageModel.TEST_ELEMENT.clone().attr(
            "data-root",
            `#${id}`
        ).attr("id", "multi_control_1");

        const $element2 = PageModel.TEST_ELEMENT.clone().attr(
            "data-root",
            `#${id}`
        ).attr("id", "multi_control_2");
        const $row = $('<div class="row mb-3">');

        $row.append(PageModel.COL.clone().append($element1));
        $row.append(PageModel.COL.clone().append($element2));
        $container.append($row);

        this.appendToMain("Case Multi Control", $container);
    }
}
