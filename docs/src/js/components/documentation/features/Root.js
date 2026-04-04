import DocArticle from "../DocArticle";

class Root {
    static build() {
        const code = `<div id="feature-root-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" data-root="#feature-root-container"></div>
</div>`;

        return DocArticle.build({
            title: "Custom root",
            description: Root.#description(),
            example: Root.#example(),
            codeBlock: {
                language: "html",
                code,
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "Bootstrap Darkmode root element can be set by the <code>data-root</code> attribute. This attribute accepts a CSS selector as value, so you can specify any element in the page as root element.";
        description.append(paragraph);

        return description;
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "feature-root-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "feature-root-toggle";
        toggle.dataset.root = "#feature-root-container";
        root.appendChild(toggle);

        return [root];
    }
}
export default Root;
