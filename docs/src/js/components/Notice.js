class Notice {
    static #HTMLTextCols = [
        "With jQuery and vanilla JavaScript (ECMAS) interfaces",
        "Supports user preferred color scheme declaration and color scheme cookie for a better experience",
    ];

    static build() {
        const section = document.createElement("section");
        section.className = "container my-5";
        section.id = "notice";
        section.appendChild(Notice.#noticeAlert());
        return section;
    }

    static #noticeAlert() {
        const notice = document.createElement("div");
        notice.className = "alert alert-success";
        notice.setAttribute("role", "alert");

        const h1 = document.createElement("h1");
        h1.className = "alert-heading fs-2";
        h1.textContent = "Made for Bootstrap 5!";
        notice.appendChild(h1);

        const p = document.createElement("p");
        p.className = "font-weight-light fs-5";
        p.textContent = `This page and all of the switch buttons shown are running on Bootstrap v${versions.bootstrap} and bs-darkmode-toggle v${versions.bsDarkmodeToggle}.`;
        notice.appendChild(p);

        const hr = document.createElement("hr");
        notice.appendChild(hr);

        notice.appendChild(Notice.#noticePanel());

        return notice;
    }

    static #noticePanel() {
        const panel = document.createElement("div");
        panel.className = "row";
        Notice.#HTMLTextCols.forEach((HTMLTextCol) => {
            panel.appendChild(Notice.#noticePanelItem(HTMLTextCol));
        });

        return panel;
    }

    static #noticePanelItem(HTMLTextCol) {
        const panelItem = document.createElement("div");
        panelItem.className = "col-12 col-md-6 mb-1 mb-md-0";

        const row = document.createElement("div");
        row.className = "row align-items-center h-100";

        const textCol = document.createElement("div");
        textCol.className = "col";
        textCol.innerHTML = HTMLTextCol;

        row.append(Notice.#noticeIconCol(), textCol);
        panelItem.appendChild(row);

        return panelItem;
    }

    static #noticeIconCol() {
        const iconCol = document.createElement("div");
        iconCol.className = "col-auto p-0 p-md-2 text-right";

        const iconLarge = document.createElement("i");
        iconLarge.className =
      "fa-solid fa-circle-check text-success d-none  d-sm-none  d-md-none  d-lg-block";
        iconLarge.setAttribute("style", "font-size:48px");
        iconLarge.setAttribute("aria-hidden", "true");
        iconCol.appendChild(iconLarge);

        const iconSmall = document.createElement("i");
        iconSmall.className =
      "fa-solid fa-circle-check text-success d-block d-sm-block d-md-block d-lg-none ";
        iconSmall.setAttribute("style", "font-size:24px");
        iconSmall.setAttribute("aria-hidden", "true");
        iconCol.appendChild(iconSmall);

        return iconCol;
    }
}

export default Notice;
