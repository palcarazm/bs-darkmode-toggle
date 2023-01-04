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
        value:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM192 0C90.02 .3203 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.8 289.2 .0039 192 0zM288.4 260.1c-15.66 17.85-35.04 46.3-49.05 75.89h-94.61c-14.01-29.59-33.39-58.04-49.04-75.88C75.24 236.8 64 206.1 64 175.1C64 113.3 112.1 48.25 191.1 48C262.6 48 320 105.4 320 175.1C320 206.1 308.8 236.8 288.4 260.1zM176 80C131.9 80 96 115.9 96 160c0 8.844 7.156 16 16 16S128 168.8 128 160c0-26.47 21.53-48 48-48c8.844 0 16-7.148 16-15.99S184.8 80 176 80z"></path></svg>',
      },
      {
        key: "darkLabel",
        value:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"></path></svg>',
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
        value: "blue",
      },
      {
        key: "darkColorMode",
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
        value: "blue",
      },
      {
        key: "darkColorMode",
        value: "red",
      },
      { key: "state", value: "dark" },
    ],
  },
  // CUSTOM STATE
  {
    name: "custom state",
    code: "custom_state",
    options: [{ key: "state", value: "dark" }],
  },
];

class TestLoader {
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
        elementDiv.attr("data-" + option.key, option.value);
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
}

export { TestLoader as default };
