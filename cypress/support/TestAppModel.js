export class TestAppModel {
  static TEST_CLASS = "test"; // Common test class
  static TEST_SELECTOR = "." + TestAppModel.TEST_CLASS; // Common test selector

  static TEST_ELEMENT_ATTR = "data-toggle"; // Test element attribute
  static TEST_ELEMENT_VAL = "bs-darkmode-toggle-test"; // Test element value
  static TEST_ELEMENT_SELECTOR =
    "[" +
    TestAppModel.TEST_ELEMENT_ATTR +
    '="' +
    TestAppModel.TEST_ELEMENT_VAL +
    '"]'; // Test element selector

  static TEST_OPTIONS_CLASS = "options"; // Common test options class
  static TEST_OPTIONS_SELECTOR = "." + TestAppModel.TEST_OPTIONS_CLASS; // Common test options selector

  static TEST_CONSOLE_CLASS = "console"; // Common test console class
  static TEST_CONSOLE_SELECTOR = "." + TestAppModel.TEST_CONSOLE_CLASS; // Common test console selector
  static TEST_CONSOLE_FIRED_TEXT = "Change event fired!"; // Test console text for a fired change event
  /**
   * Load Test App and go to the selected testcase with logs
   * @param {String} pluginInterface Plugin interface (jquery or ecmas)
   * @param {String} testcaseID data-test of the testcase loader
   * @static
   */
  static load(pluginInterface, testcaseID) {
    cy.visit("./test/test-app." + pluginInterface.toLowerCase() + ".html", {
      onBeforeLoad(win) {
        cy.stub(win.console, "log").as("consoleLog");
        cy.stub(win.console, "warn").as("consoleWarn");
        cy.stub(win.console, "error").as("consoleError");
      },
    });
    cy.get("button#" + testcaseID).click();
  }

  /**
   * Get tests in current Test App
   * @returns {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test containers
   * @static
   */
  static getTests() {
    return cy.get(TestAppModel.TEST_SELECTOR);
  }

  /**
   * Get the test element in th provided test
   * @param {JQuery<HTMLElementTagNameMap[K]>} $test test container
   * @returns {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test elements
   * @static
   */
  static getElement($test) {
    return cy.wrap($test).find(TestAppModel.TEST_ELEMENT_SELECTOR);
  }

  /**
   * Get the test options in th provided test
   * @param {JQuery<HTMLElementTagNameMap[K]>} $test test container
   * @returns {Object} Options
   * @static
   */
  static getOptions($test) {
    return JSON.parse($test.find(TestAppModel.TEST_OPTIONS_SELECTOR).text());
  }
}
