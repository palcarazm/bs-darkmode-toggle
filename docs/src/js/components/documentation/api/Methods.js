import DocArticle from "../DocArticle";

class Methods extends DocArticle {
    static #methods = [
        {
            method: "initialize",
            params: [],
            description: "Initializes the plugin with options.",
        },
        {
            method: "light",
            params: ["light"],
            description: "Enable light color scheme.",
        },
        {
            method: "dark",
            params: ["dark"],
            description: "Enable dark color scheme.",
        },
        {
            method: "toggle",
            params: ["toggle"],
            description: "Switch the enabled color scheme.",
        },
        {
            method: "setStorage",
            params: ["set_storage", "none"],
            description: `Set the storage to use for user preferences.<br>
            <small class="text-muted">Provide <code>cache</code>, <code>local</code> or <code>none</code> as second argument.</small>`,
        },
        {
            method: "destroy",
            params: ["destroy"],
            description: "Destroys the control, removes it from the DOM and clean the element reference.",
        },
    ];

    static build() {
        const root = document.createElement("div");
        root.id = "api-methods-toggle-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "api-methods-toggle";
        toggle.dataset.root = "#api-methods-toggle-container";
        root.appendChild(toggle);

        return super.build({
            title: "Methods",
            description: Methods.#description(toggle),
            codeBlock: {
                language: "html",
                code: `<div id="api-methods-toggle-container" class="p-3 bg-body border">
  <div data-plugin="bs-darkmode-toggle" id="api-methods-toggle" data-root="#api-methods-toggle-container"></div>
</div>`,
            },
            example: [root],
        });
    }

    static #description(toggle) {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML =
      "Methods can be used to control toggles directly. The following methods are available in the following way:";
        description.append(paragraph, Methods.#table(toggle));

        return description;
    }

    static #table(toggle) {
        const table = document.createElement("table");
        table.className = "table table-striped table-condensed";
        const caption = document.createElement("caption");
        caption.textContent = "API methods demo";
        table.append(caption, Methods.#thead(), Methods.#tbody(toggle));

        return table;
    }

    static #thead() {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        tr.append(
            ...["Method", "Example", "Description", "Demo"].map((label) => {
                const th = document.createElement("th");
                th.textContent = label;
                return th;
            })
        );
        thead.append(tr);
        return thead;
    }

    static #tbody(toggle) {
        const tbody = document.createElement("tbody");

        const trs = Methods.#methods.map(({ method, params, description }) => {
            const td1 = document.createElement("td");
            td1.innerHTML = `<em>${method}</em>`;

            const td2 = document.createElement("td");
            td2.innerHTML = params
                ? `<code>myToggle.bsDarkmodeToggle("${params.join("\", \"")}")</code>`
                : "<code>myToggle.bsDarkmodeToggle()</code>";

            const td3 = document.createElement("td");
            td3.innerHTML = description;

            const td4 = document.createElement("td");
            const button = document.createElement("button");
            button.className = "btn btn-outline-secondary btn-sm w-100";
            button.textContent = method;
            button.onclick = () => {
                toggle.bsDarkmodeToggle(...params);
            };
            td4.append(button);

            const tr = document.createElement("tr");
            tr.append(td1, td2, td3, td4);
            return tr;
        });

        tbody.append(...trs);
        return tbody;
    }
}

export default Methods;
