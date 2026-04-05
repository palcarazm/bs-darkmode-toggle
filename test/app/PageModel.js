import { TEST_CONSTANTS } from "../common/constants.js";

export class PageModel {
    static #ENV = $("#env-data");
    static #package = "../../package-lock.json";

    static MAIN = $("main");
    static DESCRIPTION = $("#description");
    static TEST_BUTTON_CONTAINER = $("#test-selector");
    static BUTTON_GROUP = $('<div class="btn-group" role="group"></div>');
    static BUTTON = $(
        '<button type="button" class="btn btn-outline-secondary"></button>'
    );
    static COL = $('<div class="col text-center">');
    static TEST_CONTAINER = $(
        '<div class="border p-3 mb-4 rounded bg-body text-body">'
    ).addClass(TEST_CONSTANTS.TEST_CLASS);
    static TEST_TITLE = $('<h4 class="fw-light text-capitalize">');
    static TEST_ELEMENT = $("<div></div>").attr(
        TEST_CONSTANTS.TEST_ELEMENT_ATTR,
        TEST_CONSTANTS.TEST_ELEMENT_VAL
    );
    static BADGE = $("<div></div>").addClass(
        "d-inline-flex flex-column badge font-monospace text-bg-success"
    );
    static BADGE_FAIL_CLASS = "text-bg-danger";
    static BADGE_PASS_CLASS = "text-bg-success";

    static TEST_SELECTOR = `.${TEST_CONSTANTS.TEST_CLASS}`;
    static TEST_ELEMENT_SELECTOR = TEST_CONSTANTS.TEST_ELEMENT_SELECTOR;

    constructor(interface_) {
        switch (interface_) {
            case "ECMAS":
            case "JQUERY":
                this.INTERFACE = interface_;
                break;
            default:
                throw new DOMException(
                    `Unknown interface: ${interface_}`,
                    "NotSupportedError"
                );
        }

        this.bootstrapVersion = null;
        this.bsToggleVersion = null;
        this.jqueryVersion = null;
        this.bsDarkmodeToggleVersion = null;
    }

    loadEnvData() {
        $.getJSON(PageModel.#package, (data) => {
            this.bootstrapVersion =
                data.packages["node_modules/bootstrap"]?.version || "unknown";
            this.bsToggleVersion =
                data.packages["node_modules/bootstrap5-toggle"]?.version ||
                "unknown";
            this.jqueryVersion =
                data.packages["node_modules/jquery"]?.version || "unknown";
            this.bsDarkmodeToggleVersion = data.version || "unknown";
            this.#printEnvData();
        });
    }

    #printEnvData() {
        const jqueryVersionText =
            this.INTERFACE === "JQUERY" ? ` v${this.jqueryVersion}` : "";
        const interfaceText = `Interface ${this.INTERFACE}${jqueryVersionText}`;

        PageModel.#ENV.empty();
        PageModel.#ENV.append(
            $("<div>").append(
                $("<code>").html(`bootstrap v${this.bootstrapVersion}`)
            ),
            $("<div>").append(
                $("<code>").html(`bs-toggle v${this.bsToggleVersion}`)
            ),
            $("<div>").append(
                $("<code>").html(
                    `bs-darkmode-toggle v${this.bsDarkmodeToggleVersion}`
                )
            ),
            $("<div>").append($("<code>").html(interfaceText))
        );
    }
}
