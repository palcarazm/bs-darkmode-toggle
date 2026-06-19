/// <reference types="cypress" />

import Interfaces from "../../support/Interfaces/interfaces.js";
import DarkmodeToggleComponent from "../../support/page-objects/DarkmodeToggleComponent.js";
import TestAppPage from "../../support/page-objects/TestAppPage.js";

describe("API Destroy Method Feature", () => {
    const data_test = "methods";

    const cases = [
        {
            label: "dark",
        },
        {
            label: "light",
        },
    ];

    Interfaces.forEach((pluginInterface) => {
        beforeEach(() => {
            TestAppPage.visit(pluginInterface, data_test);
        });

        cases.forEach(({ label }) => {
            context(`When Bootstrap Darkmode Toggle is in ${label} mode`, () => {
                context("And destroy method is invoked", () => {
                    const btn = "#destroy";

                    function check($element, colorMode) {
                        const checkRoot = ($root) => {
                            cy.get($root)
                                .should("have.attr", DarkmodeToggleComponent.BS_ATTRIBUTE)
                                .and("eq", colorMode);
                        };

                        cy.get(btn)
                            .click()
                            .then(() => {
                                cy.get($element).should("have.html", "");
                                DarkmodeToggleComponent.getRoot($element)
                                    .then(checkRoot);
                            });
                        
                    }

                    it(`Then control is destroyed but ${label} color scheme is preserved on container`, () => {
                        TestAppPage.getTestContainers().each(($test) => {
                            TestAppPage.getTestElement($test).each(($element) => {
                                DarkmodeToggleComponent.invokeMethod($element, pluginInterface, label);
                                check($element, label);                      
                            });
                        });
                    });
                });
            });
        });
    });
});