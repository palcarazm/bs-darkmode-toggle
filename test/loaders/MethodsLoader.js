import { BaseLoader } from "./BaseLoader.js";
import { TEST_CONSTANTS } from "../common/constants.js";
import { PageModel } from "../app/PageModel.js";

export class MethodsLoader extends BaseLoader {
    load(_testCases, interface_) {
        super.load(_testCases, interface_);
        const $container = PageModel.TEST_CONTAINER.clone().attr(
            "id",
            "test_methods"
        );
        const $element = PageModel.TEST_ELEMENT.clone().attr(
            "data-root",
            "#test_methods"
        );

        const $console = $(
            `<div class="${TEST_CONSTANTS.TEST_CONSOLE_CLASS} font-monospace"></div>`
        );
        const buttons = this.#getButtons($element);
        const $buttonGroup = this.#createButtonGroup(
            interface_,
            buttons,
            $console
        );

        const $row = $('<div class="row mb-3">').append(
            PageModel.COL.clone().append($element, $console),
            PageModel.COL.clone().append($buttonGroup)
        );

        $container.append($row);
        this.appendToMain("Case Methods", $container);
        this.#bindEvents($element, $console);
    }

    #getButtons($element) {
        return [
            {
                id: "light",
                text: "Light",
                onClickJquery: () => $element.bsDarkmodeToggle("light"),
                onClickEcmas: () => $element[0].bsDarkmodeToggle("light"),
            },
            {
                id: "lightSilent",
                text: "Light Silent",
                onClickJquery: () => $element.bsDarkmodeToggle("light", true),
                onClickEcmas: () => $element[0].bsDarkmodeToggle("light", true),
            },
            {
                id: "dark",
                text: "Dark",
                onClickJquery: () => $element.bsDarkmodeToggle("dark"),
                onClickEcmas: () => $element[0].bsDarkmodeToggle("dark"),
            },
            {
                id: "darkSilent",
                text: "Dark Silent",
                onClickJquery: () => $element.bsDarkmodeToggle("dark", true),
                onClickEcmas: () => $element[0].bsDarkmodeToggle("dark", true),
            },
            {
                id: "toggle",
                text: "Toggle",
                onClickJquery: () => $element.bsDarkmodeToggle("toggle"),
                onClickEcmas: () => $element[0].bsDarkmodeToggle("toggle"),
            },
            {
                id: "toggleSilent",
                text: "Toggle Silent",
                onClickJquery: () => $element.bsDarkmodeToggle("toggle", true),
                onClickEcmas: () =>
                    $element[0].bsDarkmodeToggle("toggle", true),
            },
            {
                id: "denyCookie",
                text: "Deny Cookie",
                onClickJquery: () => $element.bsDarkmodeToggle("denyCookie"),
                onClickEcmas: () => $element[0].bsDarkmodeToggle("denyCookie"),
            },
            {
                id: "allowCookie",
                text: "Allow Cookie",
                onClickJquery: () => $element.bsDarkmodeToggle("allowCookie"),
                onClickEcmas: () => $element[0].bsDarkmodeToggle("allowCookie"),
            },
        ];
    }

    #createButtonGroup(interface_, buttons, $console) {
        const $group = PageModel.BUTTON_GROUP.clone();

        buttons.forEach((btn) => {
            const $button = PageModel.BUTTON.clone()
                .attr("id", btn.id)
                .text(btn.text)
                .on("click", () => {
                    $console.text("");
                    switch (interface_) {
                        case "ECMAS":
                            btn.onClickEcmas();
                            break;
                        case "JQUERY":
                            btn.onClickJquery();
                            break;
                        default:
                            throw new DOMException(
                                `Unknown interface: ${interface_}`,
                                "NotSupportedError"
                            );
                    }
                });

            $group.append($button);
        });

        return $group;
    }

    #bindEvents($element, $console) {
        $element.on("change", () => {
            $console.text(TEST_CONSTANTS.CONSOLE_FIRED_TEXT);
        });
    }
}
