module.exports = function setup(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        banner:
      "/* Copyright Notice\n" +
      " * <%= pkg.name %> v<%= pkg.version %>\n" +
      " * <%= pkg.homepage %>\n" +
      " * @author 2011-2014 Min Hur (https://github.com/minhur)\n" +
      " * @author 2018-2019 Brent Ely (https://github.com/gitbrent)\n" +
      " * @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)\n" +
      " * @funding <%= pkg.funding.type %>\n" +
      " * @see <%= pkg.funding.url %>\n" +
      " * @license <%= pkg.license %>\n" +
      " * @see https://github.com/palcarazm/bs-darkmode-toggle/blob/master/LICENSE\n" +
      " */\n",
        clean: ["js","css"],
        exec: {
            ts: "npx tsc",
            rollup: "npx rollup -c",
            postcss: "npx postcss src/main/css/bs-darkmode-toggle.css -o css/bs-darkmode-toggle.css --map",
            postcssMin: "npx postcss src/main/css/bs-darkmode-toggle.css -o css/bs-darkmode-toggle.min.css --map --env production",
        },
        usebanner: {
            taskName: {
                options: {
                    position: "top",
                    banner: "<%= banner %>",
                    linebreak: true,
                    replace: true,
                },
                files: {
                    src: ["css/*.css", "js/*.js"],
                },
            },
        },
        copy: {
            main: {
                src: "README.template.md",
                dest: "README.md",
                options: {
                    process: function (content, _srcpath) {
                        let pkg = grunt.file.readJSON("package.json");
                        return content.replaceAll("#version#", pkg.version);
                    },
                },
            },
        },
        watch: {
            css:{
                files: ["src/main/css/**/*"],
                tasks: ["exec:postcss", "exec:postcssMin"],
                options: { spawn: false },
            },
            ts:{
                files: ["src/main/ts/**/*"],
                tasks: ["exec:ts"],
                options: { spawn: false },
            },
            js:{
                files: ["src/main/js/**/*"],
                tasks: ["exec:rollup"],
                options: { spawn: false },
            },
        },
    });

    grunt.loadNpmTasks("grunt-banner");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-watch");
  
    grunt.registerTask("default", ["clean", "exec:ts", "exec:rollup", "exec:postcss", "exec:postcssMin", "usebanner"]);
    grunt.registerTask("build", ["clean", "exec:ts", "exec:rollup", "exec:postcss", "exec:postcssMin", "usebanner"]);
    grunt.registerTask("readme", ["copy"]);
    grunt.registerTask("dev", ["build", "watch"]);
};
