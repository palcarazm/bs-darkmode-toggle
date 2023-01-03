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

    this.TESTCASES.set("attributes", {
      label: "attributes",
      loader: TESTLOADER.dataAttributesTest,
      description: "Check <code>bs-darkmode-toggle</code> data attributes",
      runner: TESTRUNNER.dataAttributesTest,
    });
  }

  /**
   * Load Test Cases data in the page
   */
  loadTestCases() {
    this.TESTCASES.forEach((testcase, testcaseKey) => {
      PAGEMODEL.TEST_BUTTON_CONTAINER.append(
        $('<button type="button">')
          .addClass("btn btn-secondary text-capitalize")
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
      this.TESTCASES.get(testcase).loader();
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

export { TestCases as default };
