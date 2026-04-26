import DocArticle from "../DocArticle";
import DocSection from "../DocSection";
import QuickStart from "./QuickStart";
import LogLevels from "./LogLevels";

class Monitoring extends DocSection {
    static build() {
        return super.build(
            "monitoring",
            "Monitoring",
            [
                DocArticle.build({
                    description: Monitoring.#description(),
                }),
                QuickStart.build(),
                LogLevels.build(),
            ],
            "mb-3"
        );
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "The library includes a built-in monitor for debugging and observability, powered by <a href=\"https://palcarazm.github.io/component-lifecycle/\" target=\"_blank\" rel=\"noopener noreferrer\"><code>component-lifecycle</code></a>. You can enable console logging to track theme changes and component lifecycle events without recompiling your application.";
        description.append(paragraph);

        return description;
    }
}

export default Monitoring;
