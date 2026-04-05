/// <reference types="cypress" />

import Interfaces from "../../support/Interfaces/interfaces.js";
import DarkmodeToggleComponent from "../../support/page-objects/DarkmodeToggleComponent.js";
import TestAppPage from "../../support/page-objects/TestAppPage.js";

describe("API Light Method Feature", () => {
    const data_test = "methods";

    Interfaces.forEach((pluginInterface) => {
        beforeEach(() => {
            TestAppPage.visit(pluginInterface, data_test);
        });

        context("When Bootstrap Darkmode Toggle is in light mode", () => {
            context("And light method is invoked in not silent mode", () => {
                const btn = "#light";

                it("Then Light color scheme is preserved and there is no change event", () => {
                    TestAppPage.getTestContainers().each(($test) => {
                        TestAppPage.getTestElement($test).each(($element) => {
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
                                    DarkmodeToggleComponent.checkRoot($element);
                                    TestAppPage.verifyConsoleMessage(false);
                                });
                        });
                    });
                });
            });
        });

        context("When Bootstrap Darkmode Toggle is in dark mode", () => {
            context("And light method is invoked in not silent mode", () => {
                const btn = "#light";

                it("Then Light color scheme is loaded and change event is logged", () => {
                    TestAppPage.getTestContainers().each(($test) => {
                        TestAppPage.getTestElement($test).each(($element) => {
                            DarkmodeToggleComponent.setDark(
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
                                    DarkmodeToggleComponent.checkRoot($element);
                                    TestAppPage.verifyConsoleMessage(true);
                                });
                        });
                    });
                });
            });
        });

        context("When Bootstrap Darkmode Toggle is in dark mode", () => {
            context("And light method is invoked in silent mode", () => {
                const btn = "#lightSilent";

                it("Then Light color scheme is loaded and change event is not logged", () => {
                    TestAppPage.getTestContainers().each(($test) => {
                        TestAppPage.getTestElement($test).each(($element) => {
                            DarkmodeToggleComponent.setDark(
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
                                    DarkmodeToggleComponent.checkRoot($element);
                                    TestAppPage.verifyConsoleMessage(false);
                                });
                        });
                    });
                });
            });
        });
    });
});
