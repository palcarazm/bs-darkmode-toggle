const urlParams = new URLSearchParams(globalThis.window.location.search);
const INTERFACE = urlParams.get("interface")?.toUpperCase() || "ECMAS";

const scripts = {
    ECMAS: [
        "../node_modules/bootstrap5-toggle/js/bootstrap5-toggle.ecmas.js",
        "../js/bs-darkmode-toggle.ecmas.js",
    ],
    JQUERY: [
        "../node_modules/bootstrap5-toggle/js/bootstrap5-toggle.ecmas.min.js",
        "../js/bs-darkmode-toggle.jquery.js",
    ],
};

function loadScripts(scriptList) {
    let promise = Promise.resolve();
    scriptList.forEach((src) => {
        promise = promise.then(() => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        });
    });
    return promise;
}

globalThis.window.INTERFACE = INTERFACE;

loadScripts(scripts[INTERFACE])
    .then(() => {
        import("./scripts.js");
    })
    .catch((error) => {
        console.error("Failed to load scripts:", error);
    });
