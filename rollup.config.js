import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/main/js/index.ecmas.js",
        external: ["bootstrap5-toggle"],
        output: [
            {
                file: "js/bs-darkmode-toggle.ecmas.js",
                format: "umd",
                sourcemap: true,
                globals: {
                    "bootstrap5-toggle": "BootstrapToggle"
                }
            },
            {
                file: "js/bs-darkmode-toggle.ecmas.min.js",
                format: "umd",
                sourcemap: true,
                plugins: [terser()],
                globals: {
                    "bootstrap5-toggle": "BootstrapToggle"
                }
            }
        ]
    },
    {
        input: "src/main/js/index.jquery.js",
        external: ["bootstrap5-toggle", "jquery"],
        output: [
            {
                file: "js/bs-darkmode-toggle.jquery.js",
                format: "umd",
                sourcemap: true,
                globals: {
                    "bootstrap5-toggle": "BootstrapToggle",
                    jquery: "jQuery"
                },
            },
            {
                file: "js/bs-darkmode-toggle.jquery.min.js",
                format: "umd",
                sourcemap: true,
                globals: {
                    "bootstrap5-toggle": "BootstrapToggle",
                    jquery: "jQuery"
                },
                plugins: [terser()],
            }
        ]
    }
];
