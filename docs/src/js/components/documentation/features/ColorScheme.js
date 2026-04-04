import DocArticle from "../DocArticle";

class ColorScheme {
    static build() {
        const code = `<div id="feature-color-scheme-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" data-light-color-mode="blue" data-dark-color-mode="red"></div>
</div>
<style>
  [data-bs-theme="blue"] {
    --bs-body-color: #adb5bd;
    --bs-body-color-rgb: 173, 181, 189;
    --bs-body-bg: rgb(166, 199, 247);
    --bs-body-bg-rgb: 166, 199, 247;
  }
  [data-bs-theme="red"] {
    --bs-body-color: #adb5bd;
    --bs-body-color-rgb: 173, 181, 189;
    --bs-body-bg: rgb(226, 154, 161);
    --bs-body-bg-rgb: 226, 154, 161;
  }
</style>`;

        return DocArticle.build({
            title: "Custom color scheme",
            description: ColorScheme.#description(),
            example: ColorScheme.#example(),
            codeBlock: {
                language: "html",
                code,
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "Bootstrap Darkmode light and dark color schemes can be set by the <code>data-light-color-mode</code> and <code>data-dark-color-mode</code> attributes.";
        description.append(paragraph);

        return description;
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "feature-color-scheme-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "feature-color-scheme-toggle";
        toggle.dataset.root = "#feature-color-scheme-container";
        toggle.dataset.lightColorMode = "blue";
        toggle.dataset.darkColorMode = "red";
        root.appendChild(toggle);

        return [root];
    }
}
export default ColorScheme;
