import { TEST_CONSTANTS } from "../../../test/common/constants.js";

class TestAppPage {
    static visit(pluginInterface, testId) {
        cy.visit(`./test/test-app.html?interface=${pluginInterface}`, {
            onBeforeLoad: (win) => {
                cy.stub(win.console, "log").as("consoleLog");
                cy.stub(win.console, "warn").as("consoleWarn");
                cy.stub(win.console, "error").as("consoleError");
            },
        });

        cy.clearCookie("bs-darkmode-toggle-color-scheme");
        cy.get(`button#${testId}`).click();
    }

    static getTestContainers() {
        return cy.get(`.${TEST_CONSTANTS.TEST_CLASS}`);
    }

    static getTestElement($container) {
        return cy.wrap($container).find(TEST_CONSTANTS.TEST_ELEMENT_SELECTOR);
    }

    static getConsoleOutput() {
        return cy.get(TEST_CONSTANTS.TEST_CONSOLE_SELECTOR);
    }

    static verifyConsoleMessage(expected) {
        if (expected) {
            this.getConsoleOutput().find("div")
                .contains(TEST_CONSTANTS.EVENTS_CONSOLE_TEXT.container.darkmode_change)
                .should("exist");

            this.getConsoleOutput().find("div")
                .contains(TEST_CONSTANTS.EVENTS_CONSOLE_TEXT.element.change)
                .should("exist");

            this.getConsoleOutput().find("div")
                .contains(TEST_CONSTANTS.EVENTS_CONSOLE_TEXT.element.darkmode_change)
                .should("exist");
        } else {
            this.getConsoleOutput().find("div").should("not.exist");
        }
    }

    static getOptions($test) {
        return cy
            .wrap($test)
            .find(`.${TEST_CONSTANTS.TEST_OPTIONS_CLASS}`)
            .then(($el) => {
                return JSON.parse($el.text());
            });
    }
}

export default TestAppPage;
