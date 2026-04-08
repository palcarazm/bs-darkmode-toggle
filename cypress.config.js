const { defineConfig } = require("cypress");

module.exports = defineConfig({
    allowCypressEnv: false,
    e2e: {
        screenshotOnRunFailure: false,
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
    },
    video: false,
    videoCompression: false,
});
