import { DarkModeToggle } from "./DarkModeToggle";
import { Methods } from "./types/Methods";

(function ($) {
  /**
   * Add `bsDarkmodeToggle` prototype function to HTML Elements
   * Enables execution when used with HTML - ex: `document.getElementById('toggle').bsDarkmodeToggle('light')`
   */
  function Plugin(options, args) {
    return this.each(function () {
      let instancePromise = this._bsDarkmodeToggle ? Promise.resolve(this._bsDarkmodeToggle) : DarkModeToggle.create(this, options);

      instancePromise.then((_bsDarkmodeToggle) => {
        if (options && typeof options === "string") {
          switch (options.toUpperCase()) {
            case Methods.TOGGLE:
              _bsDarkmodeToggle.toggle(args);
              break;
            case Methods.LIGHT:
              _bsDarkmodeToggle.light(args);
              break;
            case Methods.DARK:
              _bsDarkmodeToggle.dark(args);
              break;
            case Methods.SET_STORAGE:
              _bsDarkmodeToggle.setStorageType(args);
              break;
            case Methods.DESTROY:
              _bsDarkmodeToggle.destroy();
              break;
          }
        }
        this._bsDarkmodeToggle = _bsDarkmodeToggle;
      });
    });
  }

  // No Conflict
  let old = $.fn.bsDarkmodeToggle;
  $.fn.bsDarkmodeToggle = Plugin;
  $.fn.bsDarkmodeToggle.Constructor = DarkModeToggle;
  $.fn.bsDarkmodeToggle.noConflict = function () {
    $.fn.bsDarkmode = old;
    return this;
  };

  /**
   * Replace all `[data-plugin="bs-darkmode-toggle"]` inputs with "Bootstrap-Darkmode"
   * Executes once page elements have rendered enabling script to be placed in `<head>`
   */
  $(function () {
    $('[data-plugin="bs-darkmode-toggle"]').bsDarkmodeToggle();
  });

  // Export library if possible
  if (typeof module !== "undefined" && module.exports) {
    module.exports = DarkModeToggle;
  }
})(jQuery);
