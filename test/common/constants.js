export const TEST_CONSTANTS = Object.freeze({
    // Selectors
    TEST_CLASS: "test",
    TEST_ELEMENT_ATTR: "data-toggle",
    TEST_ELEMENT_VAL: "bs-darkmode-toggle-test",
    TEST_ELEMENT_SELECTOR: '[data-toggle="bs-darkmode-toggle-test"]',
    TEST_OPTIONS_CLASS: "options",
    TEST_RESULT_CLASS: "result",
    TEST_CONSOLE_CLASS: "console",
    TEST_CONSOLE_SELECTOR: ".console",

    // Events
    EVENTS_CONSOLE_TEXT:{
        element:{
            change: "change event fired on element!",
            darkmode_change: "darkmode:change event fired on element!"
        },
        container:{
            darkmode_change: "darkmode:change event fired on container!"
        }
    },

    // Plugin defaults
    DEFAULTS: {
        state: true,
        root: ":root",
        lightLabel: "<i class=\"bs-darkmode-toggle sun\"></i>",
        darkLabel: "<i class=\"bs-darkmode-toggle moon\"></i>",
        lightColorMode: "light",
        darkColorMode: "dark",
        style: "outline-secondary",
    },
});

export const TEST_CASES = Object.freeze([
    {
        id: "default",
        name: "default",
        options: [],
    },
    {
        id: "custom_icons",
        name: "custom icons",
        options: [
            { attr: "data-light-label", value: "Good Morning" },
            { attr: "data-dark-label", value: "Good Night" },
        ],
    },
    {
        id: "custom_color_mode_on",
        name: "custom color mode on",
        options: [
            { attr: "data-light-color-mode", value: "blue" },
            { attr: "data-dark-color-mode", value: "red" },
            { attr: "data-state", value: "light" },
        ],
    },
    {
        id: "custom_color_mode_off",
        name: "custom color mode off",
        options: [
            { attr: "data-light-color-mode", value: "blue" },
            { attr: "data-dark-color-mode", value: "red" },
            { attr: "data-state", value: "dark" },
        ],
    },
    {
        id: "custom_state",
        name: "custom state",
        options: [{ attr: "data-state", value: "dark" }],
    },
    {
        id: "custom_style",
        name: "custom style",
        options: [{ attr: "data-style", value: "danger" }],
    },
]);
