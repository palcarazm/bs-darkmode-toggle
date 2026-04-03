import * as pagemodel from "./PageModel.js";
const PAGEMODEL = pagemodel.default;

const OPTIONS = [
    // DEFAULT
    { name: "default", code: "default", options: [] },
    // CUSTOM ICONS
    {
        name: "custom icons",
        code: "custom_icons",
        options: [
            {
                key: "lightLabel",
                attr: "data-light-label",
                value: "Good Morning",
            },
            {
                key: "darkLabel",
                attr: "data-dark-label",
                value: "Good Night",
            },
        ],
    },
    // CUSTOM COLOR MODE ON
    {
        name: "custom color mode on",
        code: "custom_color_mode_on",
        options: [
            {
                key: "lightColorMode",
                attr: "data-light-color-mode",
                value: "blue",
            },
            {
                key: "darkColorMode",
                attr: "data-dark-color-mode",
                value: "red",
            },
            { key: "state", value: "light" },
        ],
    },
    // CUSTOM COLOR MODE OFF
    {
        name: "custom color mode off",
        code: "custom_color_mode_off",
        options: [
            {
                key: "lightColorMode",
                attr: "data-light-color-mode",
                value: "blue",
            },
            {
                key: "darkColorMode",
                attr: "data-dark-color-mode",
                value: "red",
            },
            { 
                key: "state", 
                attr: "data-state",
                value: "dark" 
            },
        ],
    },
    // CUSTOM STATE
    {
        name: "custom state",
        code: "custom_state",
        options: [{ key: "state", value: "dark" }],
    },
];

export default class TestLoader {
    /**
   * Create the layout for testing data attributes
   * @param {string} _pluginInterface Plugin Interface
   * @static
   */
    static dataAttributesTest(_pluginInterface) {
        let elementDiv, testDiv;
        OPTIONS.forEach((testcase) => {
            elementDiv = PAGEMODEL.TEST_ELEMENT.clone().attr(
                "data-root",
                "#" + testcase.code
            );
            testcase.options.forEach((option) => {
                elementDiv.attr(option.attr, option.value);
            });
            testDiv = PAGEMODEL.TEST_CONTAINER.clone().attr("id", testcase.code);
            testDiv.append(
                $('<div class="row mb-3">').append(
                    PAGEMODEL.COL.clone().append(elementDiv),
                    PAGEMODEL.COL.clone().addClass(PAGEMODEL.BADGE_CONTAINER_CLASS)
                )
            );
            PAGEMODEL.MAIN.append(
                PAGEMODEL.TEST_TITLE.clone().html("Case " + testcase.name),
                testDiv
            );
        });
    }

    /**
   * Create the layout for testing options
   * @param {string} pluginInterface Plugin Interface
   * @static
   */
    static dataOptionsTest(pluginInterface) {
        OPTIONS.forEach((testcase) => {
            let elementDiv = PAGEMODEL.TEST_ELEMENT.clone().attr(
                "data-root",
                "#" + testcase.code
            );

            let options = {};
            testcase.options.forEach((option) => {
                if (option.key === "state") {
                    options[option.key] =
            option.value === "dark" ? false : option.value === "light" || null;
                } else {
                    options[option.key] = option.value;
                }
            });

            let testDiv = PAGEMODEL.TEST_CONTAINER.clone().attr("id", testcase.code);
            testDiv.append(
                $('<div class="row mb-3">').append(
                    PAGEMODEL.COL.clone().append(elementDiv),
                    PAGEMODEL.COL.clone()
                        .addClass(PAGEMODEL.TEST_OPTIONS_CLASS + " font-monospace")
                        .text(JSON.stringify(options, null, 2)),
                    PAGEMODEL.COL.clone().addClass(PAGEMODEL.BADGE_CONTAINER_CLASS)
                )
            );

            PAGEMODEL.MAIN.append(
                PAGEMODEL.TEST_TITLE.clone().html("Case " + testcase.name),
                testDiv
            );

            switch (pluginInterface) {
            case "ECMAS":
                elementDiv[0].bsDarkmodeToggle(options);
                break;
            case "JQUERY":
                elementDiv.bsDarkmodeToggle(options);
                break;

            default:
                throw new DOMException(
                    "Unknown interface: " + pluginInterface,
                    "NotSupportedError"
                );
            }
        });
    }

    /**
   * Create the layout for testing API Methods
   * @param {string} pluginInterface Plugin Interface
   * @static
   */
    static apiMethodsTest(pluginInterface) {
        PAGEMODEL.MAIN.append(
            PAGEMODEL.TEST_TITLE.clone().html("Case Methods"),
            PAGEMODEL.TEST_CONTAINER.clone().append(
                $('<div class="row mb-3">').append(
                    PAGEMODEL.COL.clone().append(
                        PAGEMODEL.TEST_ELEMENT.clone().attr("id", "testMethods"),
                        $("<div></div>").addClass(
                            PAGEMODEL.TEST_CONSOLE_CLASS + " font-monospace"
                        )
                    ),
                    PAGEMODEL.COL.clone().append(
                        PAGEMODEL.BUTTON_GROUP.clone().append(
                            PAGEMODEL.BUTTON.clone().attr("id", "light").text("Light"),
                            PAGEMODEL.BUTTON.clone()
                                .attr("id", "lightSilent")
                                .text("Light Silent"),
                            PAGEMODEL.BUTTON.clone().attr("id", "dark").text("Dark"),
                            PAGEMODEL.BUTTON.clone()
                                .attr("id", "darkSilent")
                                .text("Dark Silent"),
                            PAGEMODEL.BUTTON.clone().attr("id", "toggle").text("Toggle"),
                            PAGEMODEL.BUTTON.clone()
                                .attr("id", "toggleSilent")
                                .text("Toggle Silent"),
                            PAGEMODEL.BUTTON.clone()
                                .attr("id", "denyCookie")
                                .text("Deny Cookie"),
                            PAGEMODEL.BUTTON.clone()
                                .attr("id", "allowCookie")
                                .text("Allow Cookie")
                        )
                    )
                )
            )
        );

        $("#testMethods").on("change", (_e) => {
            $(PAGEMODEL.TEST_CONSOLE_SELECTOR).text(
                PAGEMODEL.TEST_CONSOLE_FIRED_TEXT
            );
        });
        const clean = () => {
            $(PAGEMODEL.TEST_CONSOLE_SELECTOR).text("");
        };
        let elementDiv;

        switch (pluginInterface) {
        case "ECMAS":
            elementDiv = document.getElementById("testMethods");
            break;
        case "JQUERY":
            elementDiv = $("#testMethods");
            break;

        default:
            throw new DOMException(
                "Unknown interface: " + pluginInterface,
                "NotSupportedError"
            );
        }

        $("#light").on("click", (_e) => {
            clean();
            elementDiv.bsDarkmodeToggle("light", false);
        });
        $("#lightSilent").on("click", (_e) => {
            clean();
            elementDiv.bsDarkmodeToggle("light", true);
        });
        $("#dark").on("click", (_e) => {
            clean();
            elementDiv.bsDarkmodeToggle("dark", false);
        });
        $("#darkSilent").on("click", (_e) => {
            clean();
            elementDiv.bsDarkmodeToggle("dark", true);
        });
        $("#toggle").on("click", (_e) => {
            clean();
            elementDiv.bsDarkmodeToggle("toggle", false);
        });
        $("#toggleSilent").on("click", (_e) => {
            clean();
            elementDiv.bsDarkmodeToggle("toggle", true);
        });
        $("#denyCookie").on("click", (_e) => {
            clean();
            elementDiv.bsDarkmodeToggle("denyCookie");
        });
        $("#allowCookie").on("click", (_e) => {
            clean();
            elementDiv.bsDarkmodeToggle("allowCookie");
        });
    }
}
