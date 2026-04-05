/// <reference types="cypress" />

import Interfaces from "../../support/Interfaces/interfaces.js";
import DarkmodeToggleComponent from "../../support/page-objects/DarkmodeToggleComponent.js";
import TestAppPage from "../../support/page-objects/TestAppPage.js";

function validateCookie(expectedValuePromise){
    expectedValuePromise.then((expectedValue) => {
        cy.getCookie(
            DarkmodeToggleComponent.STORAGE_KEY
        ).should(
            "have.property",
            "value",
            expectedValue
        );
    });
}

describe("API Set Storage Cookie Method Feature", () => {
    const data_test = "methods";

    Interfaces.forEach((pluginInterface) => {
        beforeEach(() => {
            cy.clearAllCookies();
            TestAppPage.visit(pluginInterface, data_test);
        });

        context("When there is no Bootstrap Darkmode Toggle cookie", () => {
            context("And set provider is invoke with 'cookie'", () => {
                const btn = "#setProviderCookie";

                context(
                    "And Bootstrap Darkmode Toggle is in light mode",
                    () => {
                        it("Then Light color scheme is preserved and cookie is created", () => {
                            TestAppPage.getTestContainers().each(($test) => {
                                TestAppPage.getTestElement($test).each(
                                    ($element) => {
                                        DarkmodeToggleComponent.setLight(
                                            $element,
                                            pluginInterface
                                        );

                                        cy.get(btn)
                                            .click()
                                            .then(() => {
                                                DarkmodeToggleComponent.checkCurrentState(
                                                    $element,
                                                    true
                                                );
                                                DarkmodeToggleComponent.checkRoot(
                                                    $element
                                                );
                                                
                                                validateCookie(DarkmodeToggleComponent.getLightColorMode($element));
                                            });
                                    }
                                );
                            });
                        });
                        context("When Bootstrap Darkmode Toggle is toggle",()=>{
                            it("Then cookie is updated",() => {
                                TestAppPage.getTestContainers().each(($test) => {
                                    TestAppPage.getTestElement($test).each(
                                        ($element) => {
                                            DarkmodeToggleComponent.setLight(
                                                $element,
                                                pluginInterface
                                            );

                                            cy.get(btn)
                                                .click()
                                                .then(() => {
                                                    DarkmodeToggleComponent.toggle($element, pluginInterface);

                                                    validateCookie(DarkmodeToggleComponent.getDarkColorMode($element));
                                                });
                                        }
                                    );
                                });
                            });
                        });
                    }
                );

                context("And Bootstrap Darkmode Toggle is in dark mode", () => {
                    it("Then Dark color scheme is preserved and cookie is created", () => {
                        TestAppPage.getTestContainers().each(($test) => {
                            TestAppPage.getTestElement($test).each(
                                ($element) => {
                                    DarkmodeToggleComponent.setDark(
                                        $element,
                                        pluginInterface
                                    );

                                    cy.get(btn)
                                        .click()
                                        .then(() => {
                                            DarkmodeToggleComponent.checkCurrentState(
                                                $element,
                                                false
                                            );
                                            DarkmodeToggleComponent.checkRoot(
                                                $element
                                            );

                                            validateCookie(DarkmodeToggleComponent.getDarkColorMode($element));
                                        });
                                }
                            );
                        });
                    });
                    context("When Bootstrap Darkmode Toggle is toggle",()=>{
                        it("Then cookie is updated",() => {
                            TestAppPage.getTestContainers().each(($test) => {
                                TestAppPage.getTestElement($test).each(
                                    ($element) => {
                                        DarkmodeToggleComponent.setDark(
                                            $element,
                                            pluginInterface
                                        );

                                        cy.get(btn)
                                            .click()
                                            .then(() => {
                                                DarkmodeToggleComponent.toggle($element, pluginInterface);

                                                validateCookie(DarkmodeToggleComponent.getLightColorMode($element));
                                            });
                                    }
                                );
                            });
                        });
                    });
                });
            });
        });
    });
});
