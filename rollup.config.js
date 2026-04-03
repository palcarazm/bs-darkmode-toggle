import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/main/js/index.ecmas.js",
        output: [
            {
                file: "js/bs-darkmode-toggle.ecmas.js",
                format: "umd",
                sourcemap: true
            },
            {
                file: "js/bs-darkmode-toggle.ecmas.min.js",
                format: "umd",
                sourcemap: true,
                plugins: [terser()]
            }
        ]
    },
    {
        input: "src/main/js/index.jquery.js",
        external: ["jquery"],
        output: [
            {
                file: "js/bs-darkmode-toggle.jquery.js",
                format: "umd",
                sourcemap: true,
                globals: {
                    jquery: "jQuery"
                }
            },
            {
                file: "js/bs-darkmode-toggle.jquery.min.js",
                format: "umd",
                sourcemap: true,
                globals: {
                    jquery: "jQuery"
                },
                plugins: [terser()]
            }
        ]
    }
];
