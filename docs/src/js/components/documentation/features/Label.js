import DocArticle from "../DocArticle";

class Label {
    static build() {
        const code = `<div id="feature-label-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" data-light-label="Custom Light" data-dark-label="Custom Dark"></div>
</div>`;

        return DocArticle.build({
            title: "Custom label",
            description: Label.#description(),
            example: Label.#example(),
            codeBlock: {
                language: "html",
                code,
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = `Bootstrap Darkmode light and dark labels can be set by the <code>data-light-label</code> and <code>data-dark-label</code> attributes. These attributes accept HTML and strings as values.<br>
<small class="text-muted">HTML is sanitized to prevent XSS attacks, however this may remove some HTML elements.</small>`;
        description.append(paragraph);

        return description;
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "feature-label-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "feature-label-toggle";
        toggle.dataset.root = "#feature-label-container";
        toggle.dataset.lightLabel = "Custom Light";
        toggle.dataset.darkLabel = "Custom Dark";
        root.appendChild(toggle);

        return [root];
    }
}
export default Label;
