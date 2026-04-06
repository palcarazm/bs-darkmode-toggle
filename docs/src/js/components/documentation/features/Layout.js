import DocArticle from "../DocArticle";

class Layout {
    static build() {
        const code = `<div id="feature-layout-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" data-layout="toggle"></div>
  <div data-plugin="bs-darkmode-toggle" data-layout="button"></div>
</div>`;

        return DocArticle.build({
            title: "Multiple Layouts",
            description: Layout.#description(),
            example: Layout.#example(),
            codeBlock: {
                language: "html",
                code,
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "Bootstrap Darkmode Toggle layout can be changed using <code>data-layout</code> attribute. Supported layouts are <code>toggle</code> and <code>button</code>. Default layout is <code>toggle</code>.";
        description.append(paragraph);

        return description;
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "feature-layout-container";
        root.className = "p-3 bg-body border d-flex flex-row justify-content-start align-items-center";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "feature-layout-toggle";
        toggle.dataset.root = "#feature-layout-container";
        toggle.dataset.layout = "toggle";
        root.appendChild(toggle);

        const btn = document.createElement("div");
        btn.dataset.plugin = "bs-darkmode-toggle";
        btn.id = "feature-layout-toggle";
        btn.dataset.root = "#feature-layout-container";
        btn.dataset.layout = "button";
        btn.className = "ms-3";
        root.appendChild(btn);

        return [root];
    }
}
export default Layout;
