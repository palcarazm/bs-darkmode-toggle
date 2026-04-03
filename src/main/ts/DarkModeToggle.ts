import { OptionResolver } from "./core/OptionResolver";
import { StateReducer } from "./core/StateReducer";
import { CookieManager } from "./core/CookieManager";
import { DOMBuilder } from "./core/DOMBuilder";
import { ResolvedOptions } from "./core/OptionResolver.types";
import { ActionType } from "./core/StateReducer.types";

export class DarkModeToggle {
    private element: HTMLElement;
    private options: ResolvedOptions;
    private state: StateReducer;
    private cookie = new CookieManager();
    private dom: DOMBuilder;

    private COOKIE_NAME = "bs-darkmode-toggle-color-scheme";

    constructor(element: HTMLElement, opts = {}) {
        this.element = element;

        this.options = OptionResolver.resolve(element, opts);
        this.state = new StateReducer(this.options.state);
        this.applyPreferredScheme();

        this.dom = new DOMBuilder(this.element, this.options);
        this.dom.onChange((e) => {
            this.toggle(true);
            this.updateCookie();
            e.preventDefault();
        });

        this.element._bsDarkmodeToggle = this;

        this.update();
    }

    private update() {
        const isLight = this.state.get().isLight;
        this.dom.setState(isLight);
        this.updateCookie();
    }

    toggle(silent = false) {
        if(!this.state.do(ActionType.TOGGLE)) return;
        this.update();
        this.trigger(silent);
    }

    light(silent = false) {
        if(!this.state.do(ActionType.LIGHT)) return;
        this.update();
        this.trigger(silent);
    }

    dark(silent = false) {
        if(!this.state.do(ActionType.DARK)) return;
        this.update();
        this.trigger(silent);
    }

    allowCookie() {
        this.options.allowCookie = true;
        this.updateCookie();
    }

    denyCookie() {
        this.options.allowCookie = false;
        this.cookie.delete(this.COOKIE_NAME);
    }

    private trigger(silent: boolean) {
        if (!silent) {
            this.element.dispatchEvent(new Event("change", { bubbles: true }));
        }
    }

    private updateCookie() {
        if (this.options.allowCookie) {
            this.cookie.set(
                this.COOKIE_NAME,
                this.state.get().isLight
                    ? this.options.lightColorMode
                    : this.options.darkColorMode,
                0.25
            );
        }
    }

    private applyPreferredScheme() {
        if (!this.options.allowCookie) return;

        const cookie = this.cookie.get(this.COOKIE_NAME);

        if (cookie === this.options.darkColorMode) this.state.do(ActionType.DARK);
        if (cookie === this.options.lightColorMode) this.state.do(ActionType.LIGHT);
    }
}