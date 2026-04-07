/// <reference types="cypress" />

import Interfaces from "../../support/Interfaces/interfaces.js";
import DarkmodeToggleComponent from "../../support/page-objects/DarkmodeToggleComponent.js";
import TestAppPage from "../../support/page-objects/TestAppPage.js";

describe("API Toggle Method Feature", () => {
    const data_test = "methods";

    Interfaces.forEach((pluginInterface) => {
        beforeEach(() => {
            TestAppPage.visit(pluginInterface, data_test);
        });

        context("When Bootstrap Darkmode Toggle is in light mode", () => {
            context("And toggle method is invoked in not silent mode", () => {
                const btn = "#toggle";

                it("Then Dark color scheme is loaded and change event is logged", () => {
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
                                        false
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
            context("And toggle method is invoked in not silent mode", () => {
                const btn = "#toggle";

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

        context("When Bootstrap Darkmode Toggle is in light mode", () => {
            context("And toggle method is invoked in silent mode", () => {
                const btn = "#toggleSilent";

                it("Then Dark color scheme is loaded and change event is not logged", () => {
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
                                        false
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
            context("And toggle method is invoked in silent mode", () => {
                const btn = "#toggleSilent";

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
