import { TEST_CASES } from "../common/constants.js";
import { AttributesLoader } from "../loaders/AttributesLoader.js";
import { OptionsLoader } from "../loaders/OptionsLoader.js";
import { MethodsLoader } from "../loaders/MethodsLoader.js";
import { PageModel } from "./PageModel.js";
import { TestRunner } from "../runners/TestRunner.js";

export class TestCases {
    constructor(interface_) {
        this.interface = interface_;
        this.cases = new Map();
        this.#registerCases();
    }

    #registerCases() {
        this.cases.set("attributes", {
            label: "attributes",
            description:
                "Check <code>bs-darkmode-toggle</code> data attributes",
            load: () => new AttributesLoader().load(TEST_CASES, this.interface),
            run: () => TestRunner.runAllTests(),
        });

        this.cases.set("options", {
            label: "options",
            description: "Check <code>bs-darkmode-toggle</code> options",
            load: () => new OptionsLoader().load(TEST_CASES, this.interface),
            run: () => TestRunner.runAllTests(),
        });

        this.cases.set("methods", {
            label: "methods",
            description: "Check <code>bs-darkmode-toggle</code> API Methods",
            load: () => new MethodsLoader().load(TEST_CASES, this.interface),
            run: () => {},
        });
    }

    loadButtons() {
        this.cases.forEach((testCase, key) => {
            const $btn = $('<button type="button">')
                .addClass("btn btn-outline-secondary text-capitalize")
                .attr("id", key)
                .html(testCase.label)
                .on("click", () => {
                    this.#start(key);
                });

            PageModel.TEST_BUTTON_CONTAINER.append($btn);
        });
    }

    #start(testKey) {
        const testCase = this.cases.get(testKey);
        if (!testCase) return;

        PageModel.DESCRIPTION.html(testCase.description);
        PageModel.MAIN.empty();

        testCase.load();

        setTimeout(() => {
            this.#initializePlugins();

            setTimeout(() => {
                testCase.run();
            }, 100);
        }, 50);
    }

    #initializePlugins() {
        const selector = PageModel.TEST_ELEMENT_SELECTOR;

        switch (this.interface) {
            case "ECMAS":
                document.querySelectorAll(selector).forEach((el) => {
                    el.bsDarkmodeToggle();
                });
                break;
            case "JQUERY":
                $(selector).bsDarkmodeToggle();
                break;
        }
    }
}
