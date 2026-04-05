import { BaseLoader } from "./BaseLoader.js";
import { TEST_CONSTANTS } from "../common/constants.js";

export class AttributesLoader extends BaseLoader {
    load(testCases, _interface_) {
        testCases.forEach(testCase => {
            const id = testCase.id;
            const $element = this.buildElement(testCase, id);
            const $container = this.buildContainer(id, $element, false);

            // Para attributes, no mostramos options JSON
            $container.find(`.${TEST_CONSTANTS.TEST_OPTIONS_CLASS}`).remove();

            this.appendToMain(`Case ${testCase.name}`, $container);
        });
    }
}