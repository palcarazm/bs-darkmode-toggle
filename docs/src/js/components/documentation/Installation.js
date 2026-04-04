import DocArticle from "./DocArticle";
import DocSection from "./DocSection";

class Installation extends DocSection {
    static build() {
        return super.build("installation", "Installation", [
            Installation.#cdn(),
            Installation.#github(),
            Installation.#npm(),
            Installation.#yarn(),
        ]);
    }

    static #cdn() {
        const ecmas = `<script src="https://cdn.jsdelivr.net/npm/bs-darkmode-toggle@${versions.bsDarkmodeToggle}/js/bs-darkmode-toggle.ecmas.min.js"></script>`;
        const jquery = `<script src="https://cdn.jsdelivr.net/npm/bs-darkmode-toggle@${versions.bsDarkmodeToggle}/js/bs-darkmode-toggle.jquery.min.js"></script>`;
        return DocArticle.build({
            title: "CDN",
            badge: {
                name: "jsDelivr",
                href: "https://www.jsdelivr.com/package/npm/bs-darkmode-toggle",
                imgSrc:
          "https://img.shields.io/jsdelivr/npm/hm/bs-darkmode-toggle?label=hits&logo=jsdelivr&logoColor=white",
            },
            codePanel: {
                name: "cdn",
                language: "html",
                contents: [ecmas, jquery],
            },
        });
    }

    static #github() {
        return DocArticle.build({
            title: "Download from GitHub",
            badge: {
                name: "Latest release",
                href: "https://github.com/palcarazm/bs-darkmode-toggle/releases",
                imgSrc:
          "https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode-toggle/v1?logo=github",
            },
        });
    }

    static #npm() {
        return DocArticle.build({
            title: "NPM",
            badge: {
                name: "NPM",
                href: "https://www.npmjs.com/package/bs-darkmode-toggle",
                imgSrc: "https://img.shields.io/npm/dm/bs-darkmode-toggle?logo=npm",
            },
            codeBlock: {
                language: "shell",
                code: `npm install bs-darkmode-toggle@${versions.bsDarkmodeToggle}`,
            },
        });
    }

    static #yarn() {
        return DocArticle.build({
            title: "Yarn",
            codeBlock: {
                language: "shell",
                code: `yarn add bs-darkmode-toggle@${versions.bsDarkmodeToggle}`,
            },
        });
    }
}

export default Installation;
