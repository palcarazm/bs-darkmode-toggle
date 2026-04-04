import Console from "../../Console";
import DocArticle from "../DocArticle";

class SilencedActions extends DocArticle {
    static #methods = [
        "light",
        "dark",
        "toggle",
    ];

    static build() {
        const root = document.createElement("div");
        root.id = "bs-darkmode-toggle-event-silence-example";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "bs-darkmode-toggle-event-silence";
        toggle.dataset.root = "#bs-darkmode-toggle-event-silence-example";
        root.appendChild(toggle);

        const console = new Console();

        toggle.addEventListener("change", (e) => {
            console.log({
                mode: "append",
                data: "State change fired.",
            });
        });

        return super.build({
            title: "Silenced Actions",
            description: SilencedActions.#description(toggle),
            codeBlock: {
                language: "html",
                code: `<div id="bs-darkmode-toggle-event-silence-example" class="p-3 bg-body border">
  <div
    data-plugin="bs-darkmode-toggle"
    id="bs-darkmode-toggle-event-silence"
    data-root="#bs-darkmode-toggle-event-silence-example"></div>
</div>
<script>
    document
        .getElementById('bs-darkmode-toggle-event-silence')
        .addEventListener('change',(_e)=>{
            console.log('State change fired.');
        });
</script>`,
            },
            example: [root, console.htmlElement],
        });
    }

    static #description(toggle) {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML =
      "Methods can be used in silence mode just specifying the second argument to <code>true</code> on the <code>bsDarkmodeToggle</code> call. This is useful to prevent the control from propagating the change event in cases where you want to update the state, but do not want to fire the onChange event. The following methods are available in silence mode in the following way:";
        description.append(paragraph, SilencedActions.#table(toggle));

        return description;
    }

    static #table(toggle) {
        const table = document.createElement("table");
        table.className = "table table-striped table-condensed";
        const caption = document.createElement("caption");
        caption.textContent = "Silenced methods demo";
        table.append(
            caption,
            SilencedActions.#thead(),
            SilencedActions.#tbody(toggle),
        );

        return table;
    }

    static #thead() {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        tr.append(
            ...["Method", "Example", "Normal", "Silenced"].map((label) => {
                const th = document.createElement("th");
                th.textContent = label;
                return th;
            }),
        );
        thead.append(tr);
        return thead;
    }

    static #tbody(toggle) {
        const tbody = document.createElement("tbody");

        const trs = SilencedActions.#methods.map((method) => {
            const td1 = document.createElement("td");
            td1.innerHTML = `<em>${method}</em>`;

            const td2 = document.createElement("td");
            td2.innerHTML = `<code>myToggle.bsDarkmodeToggle("${method}", true)</code>`;

            const td3 = document.createElement("td");
            const defaultBtn = document.createElement("button");
            defaultBtn.className = "btn btn-outline-dark btn-sm w-100";
            defaultBtn.textContent = method;
            defaultBtn.onclick = () => {
                toggle.bsDarkmodeToggle(method, false);
            };
            td3.append(defaultBtn);

            const td4 = document.createElement("td");
            const silenceBtn = document.createElement("button");
            silenceBtn.className = "btn btn-outline-dark btn-sm w-100";
            silenceBtn.textContent = method;
            silenceBtn.onclick = () => {
                toggle.bsDarkmodeToggle(method, true);
            };
            td4.append(silenceBtn);

            const tr = document.createElement("tr");
            tr.append(td1, td2, td3, td4);
            return tr;
        });

        tbody.append(...trs);
        return tbody;
    }
}

export default SilencedActions;
