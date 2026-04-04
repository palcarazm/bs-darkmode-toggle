const terser = require("@rollup/plugin-terser");
const path = require("node:path");

module.exports = [
    {
        input: path.resolve(__dirname, "src/js/main.js"),
        output: [
            {
                file: path.resolve(__dirname, "dist/js/bundle.min.js"),
                format: "umd",
                sourcemap: true,
                plugins: [terser()]
            }
        ]
    }
];