import Console from "../../Console";
import DocArticle from "../DocArticle";

class EventPropagation extends DocArticle {
    static build() {
        const description = document.createElement("p");
        description.innerHTML = "When the color scheme changes a <code>change event</code> is fired from bootstrap darkmode toggle element, so you can listner for this event.";

        const code = `<div id="bs-darkmode-toggle-event-example" class="p-3 bg-body border">
  <div
    data-plugin="bs-darkmode-toggle"
    id="bs-darkmode-toggle-event"
    data-root="#bs-darkmode-toggle-event-example"></div>
</div>
<script>
    document
        .getElementById('bs-darkmode-toggle-event')
        .addEventListener('change',(_e)=>{
            console.log('State change fired.');
        });
</script>`;

        return super.build({
            title: "Event Propagation",
            description,
            example: EventPropagation.#example(),
            codeBlock: {
                language: "html",
                code,
            },
        });
    }

    static #example() {
        const root = document.createElement("div");
        root.id = "bs-darkmode-toggle-event-example";
        root.className = "p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.dataset.plugin = "bs-darkmode-toggle";
        toggle.id = "bs-darkmode-toggle-event";
        toggle.dataset.root = "#bs-darkmode-toggle-event-example";
        root.appendChild(toggle);

        const console = new Console();

        toggle.addEventListener("change", (e) => {
            console.log({
                mode: "append",
                data: "State change fired.",
            });
        });

        return [root, console.htmlElement];
    }
}

export default EventPropagation;
