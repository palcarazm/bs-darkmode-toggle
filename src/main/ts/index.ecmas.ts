import { DarkModeToggle } from "./DarkModeToggle";
import { DarkModeOptions } from "./core/OptionResolver.types";
import { Methods } from "./types/Methods";

(function () {

    /**
     * Add `bsDarkmodeToggle` method to HTMLElement prototype
     * Enables usage like: `document.getElementById("my-toggle").bsDarkmodeToggle({ ...options });`
     * or with methods: `document.getElementById("my-toggle").bsDarkmodeToggle("toggle");`
     */
    HTMLElement.prototype.bsDarkmodeToggle = function (options?: DarkModeOptions | Methods, args?: boolean) {
        let instance = this._bsDarkmodeToggle || new DarkModeToggle(this, options);

        if (typeof options === "string") {
            switch (options.toUpperCase()) {
            case Methods.TOGGLE:
                instance.toggle(args);
                break;
            case Methods.LIGHT:
                instance.light(args);
                break;
            case Methods.DARK:
                instance.dark(args);
                break;
            case Methods.ALLOW_COOKIE:
                instance.allowCookie();
                break;
            case Methods.DENY_COOKIE:
                instance.denyCookie();
                break;

            }
        }
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
    if (module !== undefined && module.exports) {
        module.exports = DarkModeToggle;
    }

})();