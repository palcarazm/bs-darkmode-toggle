import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

export const bannerContent = `Copyright Notice
${pkg.name} v${pkg.version}
${pkg.homepage}
@author 2023 Pablo Alcaraz Martínez (https://github.com/palcarazm)
@funding ${pkg.funding.type}
@see ${pkg.funding.url}
@license ${pkg.license}
@see https://github.com/palcarazm/bs-darkmode-toggle/blob/master/LICENSE`;