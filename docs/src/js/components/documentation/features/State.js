import DocArticle from "../DocArticle";

class State {
    static build() {
        const code = `<div id="feature-state-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" data-state="dark"></div>
</div>`;

        return DocArticle.build({
            title: "Light and Dark mode state",
            description: State.#description(),
            example: State.#example(),
            codeBlock: {
                language: "html",
                code,
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "Bootstrap Darkmode default initial state can be set by the <code>data-state</code> attribute. This attribute accepts the following values: <code>light</code> or <code>dark</code>. The state priority is the following:";
        description.append(paragraph);

        const ul = document.createElement("ol");

        [
            "<b>Site Cookie</b> (if allowed) : To keep the user preference in the site a cookie save the prefered color scheme each time the color scheme is changed.",
            "<b>User preferred color scheme</b> : If the browser is set to preffered darkmode, darkmode will be rendered.",
            "<b>Data Attribute</b> : The <code>data-state</code> attribute is specified.",
            "<b>Initialization Options</b> : The <code>state</code> option is specified in the initialization via JavaScript.",
            "<b>Default</b> : Light mode is the default color scheme.",
        ].forEach((li) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = li;
            ul.append(listItem);
        });

        description.append(ul);

        return description;
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "feature-state-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "feature-state-toggle";
        toggle.dataset.root = "#feature-state-container";
        toggle.dataset.state = "dark";
        root.appendChild(toggle);

        return [root];
    }
}
export default State;
