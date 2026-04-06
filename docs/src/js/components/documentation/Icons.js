import DocArticle from "./DocArticle";
import DocSection from "./DocSection";

class Icons extends DocSection {
    static headers = ["Icon", "Usage", "Based on"];
    static sources = {
        solarIcons:{
            name: "Solar Icons",
            href: "https://www.figma.com/community/file/1166831539721848736",
            license: "CC BY 4.0",
            licenseHref: "https://creativecommons.org/licenses/by/4.0/"
        },
        fontAwesome: {
            name: "Font Awesome",
            href: "https://fontawesome.com/",
            license: "CC BY 4.0",
            licenseHref: "https://creativecommons.org/licenses/by/4.0/"
        }
    };
    static entries = [
        {
            name: "sun",
            basedOn: Icons.sources.solarIcons,
        },
        {
            name: "moon",
            basedOn: Icons.sources.solarIcons,
        },
        {
            name: "bulb-on",
            basedOn: Icons.sources.fontAwesome,
        },
        {
            name: "bulb-off",
            basedOn: Icons.sources.fontAwesome,
        },
        
    ];

    static build() {    
        return super.build(
            "icons",
            "Custom Icons",
            [
                DocArticle.build({
                    description: Icons.#description(),
                }),
            ],
            "mb-3"
        );
    }

    static #description(){
        const container = document.createElement("div");

        const description = document.createElement("p");
        description.innerHTML = "Bootstrap Darkmode Toggle include some built in icons, that can be use adding <code>&lt;i class=\"bs-darkmode-toggle {icon name}\"&gt;&lt;/i&gt;</code>.";
        container.append(description);

        container.append(Icons.#table());

        return container;
    }

    static #table() {
        const container = document.createElement("div");
        container.className = "table-responsive";

        const table = document.createElement("table");
        table.className = "table  table-striped table-condensed mb-0";

        const caption = document.createElement("caption");
        caption.textContent = "Provided icons";

        table.append(
            caption,
            Icons.#tableHeader(),
            Icons.#tableBody()
        );
        container.appendChild(table);
        return container;
    }

    static #tableHeader() {
        const thead = document.createElement("thead");
        const row = document.createElement("tr");

        Icons.headers.forEach((headerText) => {
            const th = document.createElement("th");
            th.textContent = headerText;
            row.appendChild(th);
        });

        thead.appendChild(row);
        return thead;
    }

    static #tableBody() {
        const tbody = document.createElement("tbody");
        Icons.entries.forEach((entry) => {
            const row = document.createElement("tr");

            const tdIcon = document.createElement("td");
            const i = document.createElement("i");
            i.className = `bs-darkmode-toggle ${entry.name}`;
            tdIcon.appendChild(i);

            const tdUsage = document.createElement("td");
            const code = document.createElement("code");
            code.innerText = `<i class="bs-darkmode-toggle ${entry.name}"></i>`;
            tdUsage.appendChild(code);

            const tdBasedOn = document.createElement("td");
            tdBasedOn.innerHTML = `<a href="${entry.basedOn.href}" target="_blank">${entry.basedOn.name}</a> under <a href="${entry.basedOn.licenseHref}" target="_blank">${entry.basedOn.license}</a> license`;

            row.append(tdIcon, tdUsage, tdBasedOn);
            tbody.appendChild(row);
        });
        return tbody;
    }
}

export default Icons;
