import DocArticle from "../DocArticle";

class Storage {
    static build() {
        const code = `<div id="feature-storage-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" data-storage="local"></div>
</div>`;
        return DocArticle.build({
            title: "Store user Color Scheme preference",
            description: Storage.#description(),
            example: Storage.#example(),
            codeBlock: {
                language: "html",
                code,
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "User color mode preference can be store for a better experience while switching pages on the same application. The storage can be set by the <code>data-storage</code> attribute. This attribute accepts <code>cookie</code>, <code>local</code> or <ode>none</ode>.";
        description.append(paragraph);

        return description;
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "feature-storage-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "feature-storage-toggle";
        toggle.dataset.root = "#feature-storage-container";
        toggle.dataset.storage = "local";
        root.appendChild(toggle);

        return [root];
    }

    
}
export default Storage;
