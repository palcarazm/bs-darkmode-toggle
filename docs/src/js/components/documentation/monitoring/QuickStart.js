import DocArticle from "../DocArticle";

class QuickStart {
    static build() {
        const code = `// Enable INFO level logging
window.Darkmode.MONITOR.start('INFO');

// Switch to DEBUG level
window.Darkmode.MONITOR.setLevel('DEBUG');

// Stop monitoring entirely
window.Darkmode.MONITOR.stop();

// Restart monitoring later
window.Darkmode.MONITOR.start('DEBUG');`;

        return DocArticle.build({
            title: "Quick Start",
            description: QuickStart.#description(),
            codeBlock: {
                language: "javascript",
                code,
            },
            versionPill: {
                version: "1.1.0",
                action: "SINCE",
            },
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "Open your browser's developer console and run:";
        description.append(paragraph);

        return description;
    }
}
export default QuickStart;
