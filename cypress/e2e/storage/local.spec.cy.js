/// <reference types="cypress" />

import Interfaces from "../../support/Interfaces/interfaces.js";
import DarkmodeToggleComponent from "../../support/page-objects/DarkmodeToggleComponent.js";
import TestAppPage from "../../support/page-objects/TestAppPage.js";

function validateLocal(expectedValuePromise){
    expectedValuePromise.then((expectedValue) => {
        
        cy.getAllLocalStorage().then((storage)=>{
            const origins = Object.keys(storage);
            expect(origins.length).to.be.greaterThan(0);
            
            const firstOrigin = origins[0];
            cy.wrap(storage[firstOrigin])
                .should("have.property", DarkmodeToggleComponent.STORAGE_KEY, expectedValue);
        });
    });
}

describe("API Set Storage Local Method Feature", () => {
    const data_test = "methods";

    Interfaces.forEach((pluginInterface) => {
        beforeEach(() => {
            cy.clearAllLocalStorage();
            TestAppPage.visit(pluginInterface, data_test);
        });

        context("When there is no Bootstrap Darkmode Toggle local", () => {
            context("And set provider is invoke with 'local'", () => {
                const btn = "#setProviderLocal";

                context(
                    "And Bootstrap Darkmode Toggle is in light mode",
                    () => {
                        it("Then Light color scheme is preserved and local is created", () => {
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
                                                
                                                validateLocal(DarkmodeToggleComponent.getLightColorMode($element));
                                            });
                                    }
                                );
                            });
                        });
                        context("When Bootstrap Darkmode Toggle is toggle",()=>{
                            it("Then local is updated",() => {
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

                                                    validateLocal(DarkmodeToggleComponent.getDarkColorMode($element));
                                                });
                                        }
                                    );
                                });
                            });
                        });
                    }
                );

                context("And Bootstrap Darkmode Toggle is in dark mode", () => {
                    it("Then Dark color scheme is preserved and local is created", () => {
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

                                            validateLocal(DarkmodeToggleComponent.getDarkColorMode($element));
                                        });
                                }
                            );
                        });
                    });
                    context("When Bootstrap Darkmode Toggle is toggle",()=>{
                        it("Then local is updated",() => {
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

                                                validateLocal(DarkmodeToggleComponent.getLightColorMode($element));
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
