import DocArticle from "../DocArticle";

class AriaLabel {
    static build() {
        const code = `<div id="feature-aria-label-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" data-light-aria-label="Custom Aria Light" data-dark-aria-label="Custom Aria Dark"></div>
</div>`;

        return DocArticle.build({
            title: "Custom ARIA label",
            description: AriaLabel.#description(),
            example: AriaLabel.#example(),
            codeBlock: {
                language: "html",
                code,
            },
            versionPill: {
                version: "1.1.0",
                action: "SINCE",
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = `Bootstrap Darkmode light and dark ARIA labels can be set by the <code>data-light-aria-label</code> and <code>data-dark-aria-label</code> attributes. These attributes accept HTML and strings as values.<br>
<small class="text-muted">HTML is sanitized to prevent XSS attacks, however this may remove some HTML elements.</small>`;
        description.append(paragraph);

        return description;
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "feature-aria-label-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "feature-aria-label-toggle";
        toggle.dataset.root = "#feature-aria-label-container";
        toggle.dataset.lightAriaLabel = "Custom Aria Light";
        toggle.dataset.darkAriaLabel = "Custom Aria Dark";
        root.appendChild(toggle);

        return [root];
    }
}
export default AriaLabel;
