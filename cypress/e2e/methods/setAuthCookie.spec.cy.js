/// <reference types="cypress" />

import Interfaces from "../../support/Interfaces/interfaces.js";
import DarkmodeToggleComponent from "../../support/page-objects/DarkmodeToggleComponent.js";
import TestAppPage from "../../support/page-objects/TestAppPage.js";

describe("API Set Cookie Authorization Method Feature", () => {
    const data_test = "methods";

    Interfaces.forEach((pluginInterface) => {
        beforeEach(() => {
            TestAppPage.visit(pluginInterface, data_test);
        });

        context("When there is no Bootstrap Darkmode Toggle cookie", () => {
            context("And allowCookie method is invoked", () => {
                const btn = "#allowCookie";

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

                                                DarkmodeToggleComponent.getLightColorMode(
                                                    $element
                                                ).then((lightMode) => {
                                                    cy.getCookie(
                                                        DarkmodeToggleComponent.COOKIE_NAME
                                                    ).should(
                                                        "have.property",
                                                        "value",
                                                        lightMode
                                                    );
                                                });
                                            });
                                    }
                                );
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

                                            DarkmodeToggleComponent.getDarkColorMode(
                                                $element
                                            ).then((darkMode) => {
                                                cy.getCookie(
                                                    DarkmodeToggleComponent.COOKIE_NAME
                                                ).should(
                                                    "have.property",
                                                    "value",
                                                    darkMode
                                                );
                                            });
                                        });
                                }
                            );
                        });
                    });
                });
            });

            context("And denyCookie method is invoked", () => {
                const btn = "#denyCookie";

                it("Then color scheme is preserved and cookie is not created", () => {
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
                                    cy.getCookie(
                                        DarkmodeToggleComponent.COOKIE_NAME
                                    ).should("equal", null);
                                });
                        });
                    });
                });
            });
        });

        context("When there is Bootstrap Darkmode Toggle cookie", () => {
            context("And denyCookie method is invoked", () => {
                const btn = "#denyCookie";

                context(
                    "And Bootstrap Darkmode Toggle is in light mode",
                    () => {
                        it("Then Light color scheme is preserved and cookie is removed", () => {
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
                                                cy.getCookie(
                                                    DarkmodeToggleComponent.COOKIE_NAME
                                                ).should("equal", null);
                                            });
                                    }
                                );
                            });
                        });
                    }
                );

                context("And Bootstrap Darkmode Toggle is in dark mode", () => {
                    it("Then Dark color scheme is preserved and cookie is removed", () => {
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
                                            cy.getCookie(
                                                DarkmodeToggleComponent.COOKIE_NAME
                                            ).should("equal", null);
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
