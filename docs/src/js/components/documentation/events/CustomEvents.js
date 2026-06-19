import Console from "../../Console";
import DocArticle from "../DocArticle";

class CustomEvents extends DocArticle {
    static #events = [
        {
            name: "darkmode:change",
            action: "toggle",
        },
    ];

    static build() {
        const root = document.createElement("div");
        root.id = "event-custom-container";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "event-custom-toggle";
        toggle.dataset.root = "#event-custom-container";
        root.appendChild(toggle);

        const console = new Console();

        CustomEvents.#events.forEach((event) => {
            toggle.addEventListener(event.name, (e) => {
                e.stopPropagation();
                const detail  = {isLight: e.detail.isLight, theme: e.detail.theme, element: "<...>(HTML Element)", roots: ["<...>(HTML Element)"]};
                console.log({
                    mode: "append",
                    data: `Event ${event.name} fired on control. Event detail: ${JSON.stringify(detail, null, 2)}`,
                });
            });

            root.addEventListener(event.name, (e) => {
                e.stopPropagation();
                const detail  = {isLight: e.detail.isLight, theme: e.detail.theme, element: "<...>(HTML Element)", roots: ["<...>(HTML Element)"]};
                console.log({
                    mode: "append",
                    data: `Event ${event.name} fired on root. Event detail: ${JSON.stringify(detail, null, 2)}`,
                });
            });
        });

        return super.build({
            title: "Custom Events",
            description: CustomEvents.#description(toggle),
            codeBlock: {
                language: "html",
                code: `<div id="event-custom-container" class="p-3 bg-body border">
  <div
    data-plugin="bs-darkmode-toggle"
    id="event-custom-toggle"
    data-root="#event-custom-container"></div>
</div>
<script>
    document
        .getElementById('event-custom-toggle')
        .addEventListener('darkmode:change',(e)=>{
            e.stopPropagation();
            console.log(e);
        });
    document
        .getElementById('event-custom-container')
        .addEventListener('darkmode:change',(e)=>{
            e.stopPropagation();
            console.log(e);
        });
</script>`,
            },
            example: [root, console.htmlElement],
            versionPill: { action: "SINCE", version: "1.1.0" },
        });
    }

    static #description(toggle) {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML =
            "Bootstrap Darkmode Toggle emit custom events when its state is changed from the control and for each root element. The events details contain the current state and the element information. The following custom events are available:";
        description.append(paragraph, CustomEvents.#table(toggle));

        return description;
    }

    static #table(toggle) {
        const table = document.createElement("table");
        table.className = "table table-striped table-condensed";
        const caption = document.createElement("caption");
        caption.textContent = "Custom events";
        table.append(
            caption,
            CustomEvents.#thead(),
            CustomEvents.#tbody(toggle)
        );

        return table;
    }

    static #thead() {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        tr.append(
            ...["Event", "Example", "Launch"].map((label) => {
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

        const trs = CustomEvents.#events.map(({ name, action }) => {
            const td1 = document.createElement("td");
            td1.innerHTML = `<em>${name}</em>`;

            const td2 = document.createElement("td");
            td2.innerHTML = `<code>myToggle.addEventListener("${name}", (e)=>{...})</code>`;

            const td3 = document.createElement("td");
            const defaultBtn = document.createElement("button");
            defaultBtn.className = "btn btn-outline-dark btn-sm w-100";
            defaultBtn.textContent = action;
            defaultBtn.onclick = () => {
                toggle.bsDarkmodeToggle(action, false);
            };
            td3.append(defaultBtn);

            const tr = document.createElement("tr");
            tr.append(td1, td2, td3);
            return tr;
        });

        tbody.append(...trs);
        return tbody;
    }
}

export default CustomEvents;
