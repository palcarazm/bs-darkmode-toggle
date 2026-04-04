class Footer {
    static #userAttributions = [
        "Original by <a href=\"https://github.com/palcarazm\" target=\"_blank\">Pablo Alcaraz Martínez</a>",
    ];

    static build() {
        const footer = document.createElement("footer");
        footer.className = "bg-light border-top p-4";

        const container = document.createElement("div");
        container.className = "container";

        const content = document.createElement("div");
        content.className =
      "d-flex font-weight-light flex-column flex-md-row justify-content-around align-items-center mb-4";

        Footer.#userAttributions.forEach((attribution) => {
            const span = document.createElement("span");
            span.innerHTML = attribution;
            content.appendChild(span);
        });

        container.appendChild(content);
        footer.appendChild(container);
        return footer;
    }
}

export default Footer;
