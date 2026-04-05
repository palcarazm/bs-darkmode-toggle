/// <reference types="cypress" />

import TestAppPage from "../../support/page-objects/TestAppPage.js";
import Interfaces from "../../support/Interfaces/interfaces.js";
import checks from "./common/checks.js";

describe("Data Attribute Feature", () => {
    Interfaces.forEach((pluginInterface) => {
        const data_test = "attributes";

        context(
            "When Bootstrap Darkmode Toggle are initialized with data attributes",
            () => {
                beforeEach(() => {
                    TestAppPage.visit(pluginInterface, data_test);
                });

                checks.forEach((check) => {
                    it(`Then Bootstrap Darkmode Toggle take data-${check.name} or default`, () => {
                        TestAppPage.getTestContainers().each(($test) => {
                            TestAppPage.getTestElement($test).each(
                                ($element) => {
                                    check.test($element);
                                }
                            );
                        });
                    });
                });
            }
        );
    });
});
