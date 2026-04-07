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
        cy.wait(500);
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
            this.getConsoleOutput().should(
                "have.text",
                TEST_CONSTANTS.CONSOLE_FIRED_TEXT
            );
        } else {
            this.getConsoleOutput().should(
                "not.have.text",
                TEST_CONSTANTS.CONSOLE_FIRED_TEXT
            );
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
