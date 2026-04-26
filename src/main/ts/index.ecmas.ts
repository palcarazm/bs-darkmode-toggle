import { DarkModeToggle } from "./DarkModeToggle";
import { DarkModeOptions, StorageType } from "./core/OptionResolver.types";
import { Methods } from "./types/Methods";
import { DarkModeMonitor } from "./monitoring/DarkModeMonitor";

(function () {
    
    /**
     * Add `Darkmode` prototype function to Window
     * Enables execution when used with ECMAScript
     */
    globalThis.window.Darkmode = globalThis.window.Darkmode || {};
    Object.assign(globalThis.window.Darkmode, {MONITOR : DarkModeMonitor.getInstance()});


    /**
     * Add `bsDarkmodeToggle` method to HTMLElement prototype
     * Enables usage like: `document.getElementById("my-toggle").bsDarkmodeToggle({ ...options });`
     * or with methods: `document.getElementById("my-toggle").bsDarkmodeToggle("toggle");`
     */
    HTMLElement.prototype.bsDarkmodeToggle = function (options?: DarkModeOptions | Methods, args?: unknown) {
        let instancePromise = this._bsDarkmodeToggle ? Promise.resolve(this._bsDarkmodeToggle) : DarkModeToggle.create(this, options);

        instancePromise.then((instance) => {
            if (typeof options === "string") {
                switch (options.toUpperCase()) {
                case Methods.TOGGLE:
                    instance.toggle(args as boolean);
                    break;
                case Methods.LIGHT:
                    instance.light(args as boolean);
                    break;
                case Methods.DARK:
                    instance.dark(args as boolean);
                    break;
                case Methods.SET_STORAGE:
                    instance.setStorageType(args as StorageType);
                    break;
                case Methods.DESTROY:
                    instance.destroy();
                    break;
                }
            }
        });
    };

    /**
     * Auto-initialize plugin on elements with `data-plugin="bs-darkmode-toggle"`
     */
    if (globalThis.window !== undefined) {
        globalThis.window.onload = () => {
            globalThis.document
                .querySelectorAll<HTMLElement>('[data-plugin="bs-darkmode-toggle"]')
                .forEach((el) => el.bsDarkmodeToggle());
        };
    }

    // Export library if possible
    if (typeof module !== "undefined" && module.exports) {
        module.exports = { DarkModeToggle, DarkModeMonitor };
    }

})();