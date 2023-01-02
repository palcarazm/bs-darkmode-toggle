module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner:
      "/* Copyright Notice\n" +
      " * <%= pkg.name %> v<%= pkg.version %>\n" +
      " * <%= pkg.homepage %>\n" +
      " * @author 2023 Pablo Alcaraz Martínez (https://github.com/palcarazm)\n" +
      " * @funding <%= pkg.funding.type %>\n" +
      " * @see <%= pkg.funding.url %>\n" +
      " * @license <%= pkg.license %>\n" +
      " * @see https://github.com/palcarazm/bs-darkmode-toggle/blob/master/LICENSE\n" +
      " */\n",
    uglify: {
      options: {
        preserveComments: false,
        sourceMap: true,
      },
      build: {
        files: [
          {
            expand: true,
            cwd: "js",
            src: "bs-darkmode-toggle.jquery.js",
            dest: "js",
            ext: "jquery.min.js",
          },
          {
            expand: true,
            cwd: "js",
            src: "bs-darkmode-toggle.ecmas.js",
            dest: "js",
            ext: ".ecmas.min.js",
          },
        ],
      },
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
          src: ["js/*.js"],
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-banner");
  grunt.registerTask("default", ["uglify", "usebanner"]);
};
