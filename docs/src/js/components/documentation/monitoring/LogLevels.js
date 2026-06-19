import DocArticle from "../DocArticle";

class LogLevels extends DocArticle {
    static #levels = [
        {
            level: "ERROR",
            description: "Production mode (default)",
            items: "Nothing - zero runtime overhead",
        },
        {
            level: "WARN",
            description: "Warning mode",
            items: "Transition warnings (e.g., invalid state changes)",
        },
        {
            level: "INFO",
            description: "Informational mode",
            items: "Lifecycle events",
        },
        {
            level: "DEBUG",
            description: "Debug mode",
            items: "All events",
        },
    ];

    static build() {
        return super.build({
            title: "Log Levels",
            description: LogLevels.#description(),
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML =
      "Log levels can be used to control the amount of information logged. The following levels are available:";
        description.append(paragraph, LogLevels.#table());

        return description;
    }

    static #table() {
        const table = document.createElement("table");
        table.className = "table table-striped table-condensed";
        const caption = document.createElement("caption");
        caption.textContent = "Log levels";
        table.append(caption, LogLevels.#thead(), LogLevels.#tbody());

        return table;
    }

    static #thead() {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        tr.append(
            ...["Level", "Description", "What gets logged"].map((label) => {
                const th = document.createElement("th");
                th.textContent = label;
                return th;
            })
        );
        thead.append(tr);
        return thead;
    }

    static #tbody() {
        const tbody = document.createElement("tbody");

        const trs = LogLevels.#levels.map(({ level, description, items }) => {
            const td1 = document.createElement("td");
            td1.innerHTML = `<em>${level}</em>`;

            const td2 = document.createElement("td");
            td2.innerHTML = description;

            const td3 = document.createElement("td");
            td3.innerHTML = items;

            const tr = document.createElement("tr");
            tr.append(td1, td2, td3);
            return tr;
        });

        tbody.append(...trs);
        return tbody;
    }
}

export default LogLevels;
