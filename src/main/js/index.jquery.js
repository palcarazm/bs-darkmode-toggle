import { DarkModeToggle } from "./DarkModeToggle";
import { Methods } from "./types/Methods";
+(function ($) {
  /**
   * Add `bsDarkmodeToggle` prototype function to HTML Elements
   * Enables execution when used with HTML - ex: `document.getElementById('toggle').bsDarkmodeToggle('light')`
   */
  function Plugin(options, silent) {
    return this.each(function () {
      let _bsDarkmodeToggle = this._bsDarkmodeToggle || new DarkModeToggle(this, options && typeof options !== "string" ? options : {});

      if (options && typeof options === "string") {
        switch (options.toUpperCase()) {
          case Methods.TOGGLE:
            _bsDarkmodeToggle.toggle(silent);
            break;
          case Methods.LIGHT:
            _bsDarkmodeToggle.light(silent);
            break;
          case Methods.DARK:
            _bsDarkmodeToggle.dark(silent);
            break;
          case Methods.ALLOW_COOKIE:
            _bsDarkmodeToggle.allowCookie();
            break;
          case Methods.DENY_COOKIE:
            _bsDarkmodeToggle.denyCookie();
            break;
        }
      }
      this._bsDarkmodeToggle = _bsDarkmodeToggle;
    });
  }

  // No Confict
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
