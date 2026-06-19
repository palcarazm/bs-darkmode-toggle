import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
const template = fs.readFileSync(path.join(rootDir, "README.template.md"), "utf8");
const updated = template.replaceAll("#version#", pkg.version);

fs.writeFileSync(path.join(rootDir, "README.md"), updated);
console.log(`README.md updated to version ${pkg.version}`);