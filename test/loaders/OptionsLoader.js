import { BaseLoader } from "./BaseLoader.js";

export class OptionsLoader extends BaseLoader {
    load(testCases, interface_) {
        super.load(testCases, interface_);
        testCases.forEach((testCase) => {
            const id = testCase.id;
            const $element = this.buildElement(testCase, id);
            const $container = this.buildContainer(id, $element, true);

            const options = this.#convertToOptions(testCase.options);

            $container.find(".options").text(JSON.stringify(options, null, 2));

            this.appendToMain(`Case ${testCase.name}`, $container);

            this.#initializeWithOptions($element, options, interface_);
        });
    }

    #convertToOptions(options) {
        const result = {};
        options.forEach((opt) => {
            if (opt.key) {
                result[opt.key] = opt.value;
            } else if (opt.attr === "data-state") {
                let stateValue;
                if (opt.value === "light") {
                    stateValue = true;
                } else if (opt.value === "dark") {
                    stateValue = false;
                } else {
                    stateValue = null;
                }
                result.state = stateValue;
            } else if (opt.attr === "data-light-label") {
                result.lightLabel = opt.value;
            } else if (opt.attr === "data-dark-label") {
                result.darkLabel = opt.value;
            } else if (opt.attr === "data-light-color-mode") {
                result.lightColorMode = opt.value;
            } else if (opt.attr === "data-dark-color-mode") {
                result.darkColorMode = opt.value;
            } else if (opt.attr === "data-style") {
                result.style = opt.value;
            }
        });
        return result;
    }

    #initializeWithOptions($element, options, interface_) {
        switch (interface_) {
            case "ECMAS":
                $element[0].bsDarkmodeToggle(options);
                break;
            case "JQUERY":
                $element.bsDarkmodeToggle(options);
                break;
            default:
                throw new DOMException(
                    `Unknown interface: ${interface_}`,
                    "NotSupportedError"
                );
        }
    }
}
