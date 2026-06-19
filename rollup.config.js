import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { bannerContent } from "./scripts/package-banner.js";

const banner = `/*
 * ${bannerContent.replaceAll("\n", "\n * ")}
 */`;

const umdECMAS =     {
    input: "src/main/js/index.ecmas.js",
    external: ["bootstrap5-toggle"],
    output: [
        {
            file: "js/bs-darkmode-toggle.ecmas.js",
            format: "umd",
            sourcemap: true,
            globals: { "bootstrap5-toggle": "BootstrapToggle" },
            banner,
        },
        {
            file: "js/bs-darkmode-toggle.ecmas.min.js",
            format: "umd",
            sourcemap: true,
            plugins: [terser()],
            globals: { "bootstrap5-toggle": "BootstrapToggle" },
            banner,
        }
    ],
    plugins: [resolve({ browser: true, moduleDirectories: ["node_modules"] })]
};

const umdJquery = {
    input: "src/main/js/index.jquery.js",
    external: ["bootstrap5-toggle", "jquery"],
    output: [
        {
            file: "js/bs-darkmode-toggle.jquery.js",
            format: "umd",
            sourcemap: true,
            globals: { "bootstrap5-toggle": "BootstrapToggle", jquery: "jQuery" },
            banner,
        },
        {
            file: "js/bs-darkmode-toggle.jquery.min.js",
            format: "umd",
            sourcemap: true,
            globals: { "bootstrap5-toggle": "BootstrapToggle", jquery: "jQuery" },
            plugins: [terser()],
            banner,
        }
    ],
    plugins: [resolve({ browser: true, moduleDirectories: ["node_modules"] })]
};

const main = {
    input: "src/main/js/index.js",
    external: ["bootstrap5-toggle"],
    output: [
        {
            file: "dist/bs-darkmode-toggle.cjs",
            format: "cjs",
            sourcemap: true,
            plugins: [terser()],
            banner,
        },
        {
            file: "dist/bs-darkmode-toggle.mjs",
            format: "esm",
            sourcemap: true,
            plugins: [terser()],
            banner,
        }
    ],
    plugins: [resolve({ browser: true, moduleDirectories: ["node_modules"] })]
};

const types =     {
    input: "dist/tmp/@types/index.d.ts",
    output: {
        file: "dist/bs-darkmode-toggle.d.ts",
        format: "es",
        banner,
    },
    plugins: [dts()]
};

export default [umdECMAS, umdJquery, main, types];
