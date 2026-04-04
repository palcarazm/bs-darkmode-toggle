import DocSection from "./DocSection";
import DocArticle from "./DocArticle";

class Usage extends DocSection {
    static build() {
        return super.build("usage", "Usage", [Usage.#html(), Usage.#js()]);
    }

    static #html() {
        const description = document.createElement("p");
        description.innerHTML = "Simply create a <code>div</code> with the data attribute <code>data-plugin=\"bs-darkmode-toggle\"</code>.";

        return DocArticle.build({
            title: "Initialize with HTML",
            description,
            codeBlock: {
                language: "html",
                code: "<div data-plugin=\"bs-darkmode-toggle\"></div>",
            },
        });
    }

    static #js() {
        const description = document.createElement("p");
        description.innerHTML = "Simply call the <code>bsDarkmodeToggle</code> method to convert checkboxes into toggles. See <a href=\"#api\">Options</a> for additional options.";

        const ecmas = "document.querySelector(mySelector).bsDarkmodeToggle();";
        const jquery = "$(mySelector).bsDarkmodeToggle();";

        return DocArticle.build({
            title: "Initialize with JavaScript",
            description,
            codePanel: {
                name: "usage-js",
                language: "javascript",
                contents: [ecmas, jquery],
            },
        });
    }
}

export default Usage;
