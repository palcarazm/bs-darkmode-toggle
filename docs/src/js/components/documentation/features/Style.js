import DocArticle from "../DocArticle";

class Style {
    static build() {
        const code = `<div id="feature-style-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" data-style="success"></div>
</div>`;

        return DocArticle.build({
            title: "Custom style",
            description: Style.#description(),
            example: Style.#example(),
            codeBlock: {
                language: "html",
                code,
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "Bootstrap Darkmode toggle can be styled by the <code>data-style</code> attribute. This attribute accepts any of the standard Bootstrap 5 color classes as value, for example: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code>, <code>light</code>, and <code>dark</code>. If no value is provided, the default style is applied.";
        description.append(paragraph);

        return description;
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "feature-style-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "feature-style-toggle";
        toggle.dataset.root = "#feature-style-container";
        toggle.dataset.style = "success";
        root.appendChild(toggle);

        return [root];
    }
}
export default Style;
