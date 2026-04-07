import { PageModel } from "./PageModel.js";
import { TestCases } from "./TestCases.js";

export class TestApp {
    constructor(interface_) {
        this.interface = interface_;
        this.pageModel = new PageModel(interface_);
        this.testCases = new TestCases(interface_);
    }

    init() {
        this.pageModel.loadEnvData();
        this.testCases.loadButtons();
    }
}
