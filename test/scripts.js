import { TestApp } from "./app/TestApp.js";

$(function () {
    const testApp = new TestApp(globalThis.window.INTERFACE);
    testApp.init();
});
