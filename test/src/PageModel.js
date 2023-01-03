import * as purify from "../../node_modules/dompurify/dist/purify.es.js";
const DOMPurify = purify.default;

import { TestAppModel } from "../../cypress/support/TestAppModel.js";

class PageModel extends TestAppModel {
  static #ENV = $("#env-data"); // Enviroment data container
  static #package = "../../package-lock.json"; // Path to package lock
  static MAIN = $("main"); // Main container
  static DESCRIPTION = $("#description"); // Description container
  static TEST_BUTTON_CONTAINER = $("#test-selector"); // Test button container
  static COL = $('<div class="col text-center">'); // Column element
  static TEST_CONTAINER = $(
    '<div class="border p-3 mb-4 rounded bg-body text-body">'
  ).addClass(this.TEST_CLASS); // Test container
  static TEST_TITLE = $('<h4 class="fw-light text-capitalize">'); // Test title container
  static TEST_ELEMENT = $("<div></div>").attr(
    this.TEST_ELEMENT_ATTR,
    this.TEST_ELEMENT_VAL
  ); // Test element
  static BADGE = $("<div></div>").addClass(
    "d-inline-flex flex-column badge text-monospace text-bg-success"
  ); // Test Badge
  static BADGE_FAIL_CLASS = "text-bg-danger"; // Class for failed test badge
  static BADGE_PASS_CLASS = "text-bg-success"; // Class for passed test badge
  static BADGE_CONTAINER_CLASS = "result"; // Class for badge container
  static BADGE_CONTAINER_SELECTOR = ".result"; // Badge container selector

  constructor(INTERFACE) {
    super();
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
  }

  /**
   * Load Enviroment Data in the page
   */
  loadEnvData() {
    $.getJSON(
      PageModel.#package,
      function (data) {
        this.bootstrapVersion = DOMPurify.sanitize(
          data.packages["node_modules/bootstrap"].version
        );
        this.bsToggleVersion = DOMPurify.sanitize(
          data.packages["node_modules/bootstrap5-toggle"].version
        );
        this.jqueryVersion = DOMPurify.sanitize(
          data.packages["node_modules/jquery"].version
        );
        this.bsDarkmodeToggleVersion = DOMPurify.sanitize(data.version);
        this.#printEnvData();
      }.bind(this)
    );
  }

  /**
   * Print Enviroment Data in the page
   */
  #printEnvData() {
    PageModel.#ENV.html("");
    PageModel.#ENV.append(
      $("<div>").append(
        $("<code>").html("bootstrap v" + this.bootstrapVersion)
      ),
      $("<div>").append($("<code>").html("bs-toggle v" + this.bsToggleVersion)),
      $("<div>").append(
        $("<code>").html("bs-darkmode-toggle v" + this.bsDarkmodeToggleVersion)
      ),
      $("<div>").append(
        $("<code>").html(
          "Interface " +
            this.INTERFACE +
            (this.INTERFACE === "JQUERY" ? " v" + this.jqueryVersion : "")
        )
      )
    );
  }
}

export { PageModel as default };
