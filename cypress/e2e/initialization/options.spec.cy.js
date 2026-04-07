/// <reference types="cypress" />

import Interfaces from "../../support/Interfaces/interfaces.js";
import TestAppPage from "../../support/page-objects/TestAppPage.js";
import checks from "./common/checks.js";

describe("Options Feature", () => {
    Interfaces.forEach((pluginInterface) => {
        const data_test = "options";

        context(
            "When Bootstrap Darkmode Toggle are initialized with options",
            () => {
                beforeEach(() => {
                    TestAppPage.visit(pluginInterface, data_test);
                });

                checks.forEach((check) => {
                    it(`Then Bootstrap Darkmode Toggle takes ${check.name} from options or default`, () => {
                        TestAppPage.getTestContainers().each(($test) => {
                            TestAppPage.getOptions($test).as("options");
                            TestAppPage.getTestElement($test).each(
                                ($element) => {
                                    check.test($element, cy.get("@options"));
                                }
                            );
                        });
                    });
                });
            }
        );
    });
});
