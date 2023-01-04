import * as pagemodel from "./PageModel.js";
const PAGEMODEL = pagemodel.default;

import * as testloader from "./TestLoader.js";
const TESTLOADER = testloader.default;

import * as testrunner from "./TestRunner.js";
const TESTRUNNER = testrunner.default;

class TestCases {
  TESTCASES = new Map();

  constructor(INTERFACE) {
    switch (INTERFACE) {
      case "ECMAS":
      case "JQUERY":
        this.INTERFACE = INTERFACE;
        break;

      default:
        throw new DOMException(
          "Unknown interface: " + INTERFACE,
          "NotSupportedError"
        );
    }

    this.TESTCASES.set(
      "attributes",
      new TestCase(
        "attributes",
        "Check <code>bs-darkmode-toggle</code> data attributes",
        TESTLOADER.dataAttributesTest,
        TESTRUNNER.dataAttributesTest
      )
    );

    this.TESTCASES.set(
      "options",
      new TestCase(
        "options",
        "Check <code>bs-darkmode-toggle</code> options",
        TESTLOADER.dataOptionsTest,
        TESTRUNNER.dataOptionsTest
      )
    );
  }

  /**
   * Load Test Cases data in the page
   */
  loadTestCases() {
    this.TESTCASES.forEach((testcase, testcaseKey) => {
      PAGEMODEL.TEST_BUTTON_CONTAINER.append(
        $('<button type="button">')
          .addClass("btn btn-outline-secondary text-capitalize")
          .attr("id", testcaseKey)
          .html(testcase.label)
          .on(
            "click",
            function (_e) {
              this.#start(testcaseKey);
            }.bind(this)
          )
      );
    });
  }

  /**
   * Start Test Case builder and runner
   * @param {string} testcase Key of the testcase
   * @private
   */
  #start(testcase) {
    this.#load(testcase);

    switch (this.INTERFACE) {
      case "ECMAS":
        document
          .querySelectorAll(PAGEMODEL.TEST_ELEMENT_SELECTOR)
          .forEach((ele) => {
            ele.bsDarkmodeToggle();
          });
        break;
      case "JQUERY":
        $(PAGEMODEL.TEST_ELEMENT_SELECTOR).bsDarkmodeToggle();
        break;

      default:
        throw new DOMException(
          "Unknown interface: " + this.INTERFACE,
          "NotSupportedError"
        );
    }

    setTimeout(
      function () {
        this.#run(testcase);
      }.bind(this),
      500
    );
  }

  /**
   * Run test case loader
   * @param {string} testcase Key of the testcase
   * @private
   */
  #load(testcase) {
    if (this.TESTCASES.has(testcase)) {
      PAGEMODEL.DESCRIPTION.html(this.TESTCASES.get(testcase).description);
      PAGEMODEL.MAIN.html("");
      this.TESTCASES.get(testcase).loader(this.INTERFACE);
    } else {
      throw new DOMException(
        "Unknown test case: " + testcase,
        "NotSupportedError"
      );
    }
  }

  /**
   * Run test case runner
   * @param {string} testcase Key of the testcase
   * @private
   */
  #run(testcase) {
    if (this.TESTCASES.has(testcase)) {
      this.TESTCASES.get(testcase).runner();
    } else {
      throw new DOMException(
        "Unknown test case: " + testcase,
        "NotSupportedError"
      );
    }
  }
}

class TestCase {
  constructor(
    label,
    description,
    loader,
    runner = () => {
      return null;
    }
  ) {
    this.label = label;
    this.description = description;
    this.loader = loader;
    this.runner = runner;
  }
}

export { TestCases as default };
