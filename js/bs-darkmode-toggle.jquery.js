/* Copyright Notice
 * bs-darkmode-toggle v0.0.0-beta
 * https://palcarazm.github.io/bs-darkmode-toggle/
 * @author 2023 Pablo Alcaraz Martínez (https://github.com/palcarazm)
 * @funding GitHub Sponsors
 * @see https://github.com/sponsors/palcarazm
 * @license MIT
 * @see https://github.com/palcarazm/bs-darkmode-toggle/blob/master/LICENSE
 */

"use strict";

+(function ($) {
  class DarkmodeToggle {
    COOKIE_NAME = "bs-darkmode-toggle";
    BS_ATTRIBUTE = "data-bs-theme";

    /**
     * Contructor of the Bootstrap Darkmode Toggle
     * @param {HTMLElement} element
     * @param {Object} options
     */
    constructor(element, options) {
      const DEFAULTS = {
        state: true,
        root: ":root",
        allowsCookie: false,
        lightLabel:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M505.2 324.8l-47.73-68.78l47.75-68.81c7.359-10.62 8.797-24.12 3.844-36.06c-4.969-11.94-15.52-20.44-28.22-22.72l-82.39-14.88l-14.89-82.41c-2.281-12.72-10.76-23.25-22.69-28.22c-11.97-4.936-25.42-3.498-36.12 3.844L256 54.49L187.2 6.709C176.5-.6016 163.1-2.039 151.1 2.896c-11.92 4.971-20.4 15.5-22.7 28.19l-14.89 82.44L31.15 128.4C18.42 130.7 7.854 139.2 2.9 151.2C-2.051 163.1-.5996 176.6 6.775 187.2l47.73 68.78l-47.75 68.81c-7.359 10.62-8.795 24.12-3.844 36.06c4.969 11.94 15.52 20.44 28.22 22.72l82.39 14.88l14.89 82.41c2.297 12.72 10.78 23.25 22.7 28.22c11.95 4.906 25.44 3.531 36.09-3.844L256 457.5l68.83 47.78C331.3 509.7 338.8 512 346.3 512c4.906 0 9.859-.9687 14.56-2.906c11.92-4.969 20.4-15.5 22.7-28.19l14.89-82.44l82.37-14.88c12.73-2.281 23.3-10.78 28.25-22.75C514.1 348.9 512.6 335.4 505.2 324.8zM456.8 339.2l-99.61 18l-18 99.63L256 399.1L172.8 456.8l-18-99.63l-99.61-18L112.9 255.1L55.23 172.8l99.61-18l18-99.63L256 112.9l83.15-57.75l18.02 99.66l99.61 18L399.1 255.1L456.8 339.2zM256 143.1c-61.85 0-111.1 50.14-111.1 111.1c0 61.85 50.15 111.1 111.1 111.1s111.1-50.14 111.1-111.1C367.1 194.1 317.8 143.1 256 143.1zM256 319.1c-35.28 0-63.99-28.71-63.99-63.99S220.7 192 256 192s63.99 28.71 63.99 63.1S291.3 319.1 256 319.1z"/></svg>',
        darkLabel:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M421.6 379.9c-.6641 0-1.35 .0625-2.049 .1953c-11.24 2.143-22.37 3.17-33.32 3.17c-94.81 0-174.1-77.14-174.1-175.5c0-63.19 33.79-121.3 88.73-152.6c8.467-4.812 6.339-17.66-3.279-19.44c-11.2-2.078-29.53-3.746-40.9-3.746C132.3 31.1 32 132.2 32 256c0 123.6 100.1 224 223.8 224c69.04 0 132.1-31.45 173.8-82.93C435.3 389.1 429.1 379.9 421.6 379.9zM255.8 432C158.9 432 80 353 80 256c0-76.32 48.77-141.4 116.7-165.8C175.2 125 163.2 165.6 163.2 207.8c0 99.44 65.13 183.9 154.9 212.8C298.5 428.1 277.4 432 255.8 432z"/></svg>',
        lightColorMode: "light",
        darkColorMode: "dark",
        style: "outline-secondary",
      };
      options = options || {};

      // A: Capture ref to HMTL element
      this.$element = $(element);

      // B: Set options
      let state = null;
      if (this.$element.attr("data-state")) {
        if (this.$element.attr("data-state") === "dark") state = false;
        else if (this.$element.attr("data-state") === "light") state = true;
      }
      this.options = {
        state: state ?? options.lightlabel ?? DEFAULTS.state,
        root: this.$element.attr("data-root") || options.root || DEFAULTS.root,
        allowsCookie:
          this.$element.is("[data-allowsCookie]") ||
          options.allowsCookie ||
          DEFAULTS.allowsCookie,
        lightLabel:
          this.$element.attr("data-lightLabel") ||
          options.lightLabel ||
          DEFAULTS.lightLabel,
        darkLabel:
          this.$element.attr("data-darkLabel") ||
          options.darkLabel ||
          DEFAULTS.darkLabel,
        lightColorMode:
          this.$element.attr("data-lightColorMode") ||
          options.lightColorMode ||
          DEFAULTS.lightColorMode,
        darkColorMode:
          this.$element.attr("data-darkColorMode") ||
          options.darkColorMode ||
          DEFAULTS.darkColorMode,
        style: DEFAULTS.style,
      };
      this.#setPreferedColorScheme();

      // LAST: initialize
      this.#init();
    }

    /**
     * Initialize the Bootstrap Darkmode Toggle
     * @private
     */
    #init() {
      // 1: Render darkmode toggle
      this.$bsToggle = $("<input></input>").attr("type", "checkbox");
      this.$element.html("");
      this.$element.append(this.$bsToggle);
      this.$bsToggle.bootstrapToggle({
        onlabel: this.options.lightLabel,
        offlabel: this.options.darkLabel,
        onstyle: this.options.style,
        offstyle: this.options.style,
      });

      this.#update();

      // 2: Add listener
      this.$bsToggle.on("change", (e) => {
        this.#actionPerformed(e, this);
      });

      if (window.matchMedia) {
        window
          .matchMedia("(prefers-color-scheme: light)")
          .addEventListener("change", (e) => {
            if (this.options.state != e.matches) {
              this.$bsToggle.bootstrapToggle("toggle");
            }
          });
      }

      // 3: Keep reference to this instance for subsequent calls via `getElementById().bsDarkmode()`
      this.$element._bsDarkmodeToggle = this;
    }

    /**
     * Update the Bootstrap Darkmode Toggle
     * @private
     */
    #update() {
      // 1: Set state
      this.$bsToggle.bootstrapToggle(this.options.state ? "on" : "off", true);

      // 2: Set Color scheme
      $(this.options.root).attr(
        this.BS_ATTRIBUTE,
        this.options.state
          ? this.options.lightColorMode
          : this.options.darkColorMode
      );
    }

    /**
     * Toggle the color scheme
     * @param {Boolean} silent
     */
    toggle(silent = false) {
      this.options.state = !this.options.state;
      this.#update();
      this.#trigger(silent);
    }

    /**
     * Set light color scheme
     * @param {Boolean} silent
     */
    light(silent = false) {
      if (this.options.state) return;
      this.options.state = true;
      this.#update();
      this.#trigger(silent);
    }

    /**
     * Set dark color scheme
     * @param {Boolean} silent
     */
    dark(silent = false) {
      if (!this.options.state) return;
      this.options.state = false;
      this.#update();
      this.#trigger(silent);
    }

    /**
     * Fire a change event
     * @param {Bolean} silent
     * @private
     */
    #trigger(silent) {
      if (!silent) {
        this.$element.trigger("change");
      }
    }

    /**
     * Set the cookie Authorization status
     * @param {Bolena} status
     */
    setCookieAutorization(status) {
      this.options.allowsCookie = status;
      if (status) {
        this.#setCookie(
          this.COOKIE_NAME,
          this.options.state
            ? this.options.lightColorMode
            : this.options.darkColorMode,
          0.25
        );
      } else {
        this.#deleteCookie(this.COOKIE_NAME);
      }
    }

    /**
     * Set the preferred color scheme
     * @private
     */
    #setPreferedColorScheme() {
      // Cookie Preferred Scheme Dark
      if (this.options.allowsCookie) {
        let cookie = this.#getCookie(this.COOKIE_NAME);
        if (cookie === this.options.darkColorMode) {
          this.options.state = false;
          return;
        } else if (cookie === this.options.lightColorMode) {
          this.options.state = true;
          return;
        }
      }

      // User Preferred Scheme Dark
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.options.state = false;
      }
    }

    /**
     * Trigger actions
     * @param {Event} e event
     * @param {Darkmode} target Darkmode
     * @private
     */
    #actionPerformed(e, target) {
      target.toggle(false);
      if (target.options.allowsCookie) {
        target.#setCookie(
          target.COOKIE_NAME,
          target.options.state
            ? target.options.lightColorMode
            : target.options.darkColorMode,
          0.25
        );
      }
      e.preventDefault();
    }

    /**
     * Set a Cookie
     * @param {String} name Cookie Name
     * @param {String} value Cookie Value
     * @param {Number} days Days to expiration
     * @author Mandeep Janjua and Fakhruddin Ujjainwala
     * @see https://stackoverflow.com/a/24103596/17594569
     * @license CC BY-SA 4.0
     */
    #setCookie(name, value, days) {
      let expires = "";
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    /**
     * Get a Cookie
     * @param {String} name Cookie Name
     * @returns {String | null} Cookie Value
     * @author Srinivas Sabbani and Mohit Kumar Gupta
     * @see https://stackoverflow.com/a/4825695/17594569
     * @license CC BY-SA 4.0
     */
    #getCookie(name) {
      if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(name + "=");
        if (start != -1) {
          start = start + name.length + 1;
          let end = document.cookie.indexOf(";", start);
          if (end == -1) {
            end = document.cookie.length;
          }
          return decodeURIComponent(document.cookie.substring(start, end));
        }
      }
      return null;
    }

    /**
     * Delete a Cookie
     * @param {String} name Cookie Name
     * @author Mandeep Janjua and Fakhruddin Ujjainwala
     * @see https://stackoverflow.com/a/24103596/17594569
     * @license CC BY-SA 4.0
     */
    #deleteCookie(name) {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  }

  /**
   * Add `bsDarkmodeToggle` prototype function to HTML Elements
   * Enables execution when used with HTML - ex: `document.getElementById('toggle').bsDarkmodeToggle('light')`
   */
  function Plugin(options, args) {
    // Multiple Element
    if ($(this).length > 1) {
      $(this).each((_index, element) => {
        $(element).bsDarkmodeToggle(options, args);
      });
      return;
    }

    // Single element
    let _bsDarkmodeToggle = $(this).data("bs.darkmode.toggle");
    if (!_bsDarkmodeToggle) {
      _bsDarkmodeToggle = new DarkmodeToggle(this, options);
      $(this).data("bs.darkmode.toggle", _bsDarkmodeToggle);
    }

    if (options && typeof options === "string") {
      switch (options.toLowerCase()) {
        case "toggle":
          _bsDarkmodeToggle.toggle(args);
          break;
        case "light":
          _bsDarkmodeToggle.light(args);
          break;
        case "dark":
          _bsDarkmodeToggle.dark(args);
          break;
        case "setCookieAutorization":
          _bsDarkmodeToggle.setCookieAutorization(args);
          break;

        default:
          throw new DOMException(
            "Bootstrap Darkmode Toggle method '" + options + "' doesn't exist",
            "NotSupportedError"
          );
      }
    }
  }

  // No Confict
  let old = $.fn.bsDarkmodeToggle;
  $.fn.bsDarkmodeToggle = Plugin;
  $.fn.bsDarkmodeToggle.Constructor = DarkmodeToggle;
  $.fn.bsDarkmodeToggle.noConflict = function () {
    $.fn.bsDarkmode = old;
    return this;
  };

  /**
   * Replace all `[data-plugin="bs-darkmode-toggle"]` inputs with "Bootstrap-Darkmode"
   * Executes once page elements have rendered enabling script to be placed in `<head>`
   */
  if (typeof window !== "undefined")
    window.onload = function () {
      document
        .querySelectorAll('[data-plugin="bs-darkmode-toggle"]')
        .forEach(function (ele) {
          ele.bsDarkmodeToggle();
        });
    };

  // Export library if possible
  if (typeof module !== "undefined" && module.exports) {
    module.exports = DarkmodeToggle;
  }
})(jQuery);
