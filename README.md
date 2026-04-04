[![GitHub license](https://img.shields.io/github/license/palcarazm/bs-darkmode-toggle.svg?color=informational)](https://github.com/palcarazm/bs-darkmode-toggle/blob/master/LICENSE)
[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode-toggle/v1?logo=github)](https://github.com/palcarazm/bs-darkmode-toggle/releases)
[![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=%5E5.3.0&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.3)
[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bs-darkmode-toggle?label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bs-darkmode-toggle)
[![NPM Badge](https://img.shields.io/npm/dm/bs-darkmode-toggle?logo=npm)](https://www.npmjs.com/package/bs-darkmode-toggle)
[![EOL](https://img.shields.io/endpoint?url=https%3A%2F%2Fpalcarazm.github.io%2Fbs-darkmode-toggle%2Fapi%2Feol%2Fv1)](https://github.com/palcarazm/bs-darkmode-toggle/security/policy)
[![Funding](https://img.shields.io/badge/sponsor-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/sponsors/palcarazm)

[![Coverage Status](https://img.shields.io/coverallsCoverage/github/palcarazm/bs-darkmode-toggle?branch=v5&logo=coveralls)](https://coveralls.io/github/palcarazm/bs-darkmode-toggle?branch=v5)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=palcarazm_bs-darkmode-toggle&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=palcarazm_bs-darkmode-toggle)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=palcarazm_bs-darkmode-toggle&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=palcarazm_bs-darkmode-toggle)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=palcarazm_bs-darkmode-toggle&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=palcarazm_bs-darkmode-toggle)
[![Security](https://img.shields.io/badge/security-monitored-informational?logo=snyk)](https://snyk.io/advisor/npm-package/bs-darkmode-toggle)


# Bootstrap Darkmode Toggle
**Bootstrap Darkmode Toggle** is a plugin for bootstrap to add a light/dark mode switch in to your app.

---
#### Library Distributions

| Version | Bootstrap Support | Last Release |
| :-----: | :---------------: | :----------: |
| [v1](https://github.com/palcarazm/bs-darkmode-toggle/tree/v1) | [![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=%5E5.3.0-alpha&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode-toggle/v1?logo=github)](https://github.com/palcarazm/bs-darkmode-toggle/releases) |

See EOL for each version in [Security Policy Page](https://github.com/palcarazm/bs-darkmode-toggle/security/policy).

# Demo and documentation

**Please read our documentation page for a completed usage explanation:** https://palcarazm.github.io/bs-darkmode-toggle/

---

<!-- To update TOC run .\node_modules\.bin\doctoc README.md --github -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
  - [CDN](#cdn)
    - [ECMAS Interface](#ecmas-interface)
    - [jQuery Interface](#jquery-interface)
  - [Download](#download)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Usage](#usage)
  - [Initialize with HTML](#initialize-with-html)
  - [Initialize with JS](#initialize-with-js)
- [Collaborators welcome!](#collaborators-welcome)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

# Installation

## CDN

[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bs-darkmode-toggle?label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bs-darkmode-toggle)

### ECMAS Interface

```html
<!-- Consider loading Bootstrap and Bootstrap 5 toggle dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bs-darkmode-toggle@1.0.0-rc1/js/bs-darkmode-toggle.ecmas.min.js"></script>
```

### jQuery Interface

```html
<!-- Consider loading Bootstrap, jQuery and Bootstrap 5 toggle dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bs-darkmode-toggle@1.0.0-rc1/js/bs-darkmode-toggle.jquery.min.js"></script>
```

## Download

[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode-toggle/v1?logo=github)](https://github.com/palcarazm/bs-darkmode-toggle/releases)

## NPM

[![NPM Badge](https://img.shields.io/npm/dm/bs-darkmode-toggle?logo=npm)](https://www.npmjs.com/package/bs-darkmode-toggle)

```ksh
npm install bs-darkmode-toggle@1.0.0-rc1
```

## Yarn

```ksh
yarn add bs-darkmode-toggle@1.0.0-rc1
```

# Usage

## Initialize with HTML
Simply create a `div` with the data attribute `data-plugin="bs-darkmode-toggle"`.
```html
<div data-plugin="bs-darkmode-toggle"></div>
```

## Initialize with JS
Simply select the element and invoke the Boostrap Darkmode Toggle API.
```html
<div id="bs-darkmode-toggle"></div>
<script>
  document.getElementById('bs-darkmode-toggle').bsDarkmodeToggle();
</script>
```

# Collaborators welcome!

- :sos: Do you need some help? Open a thread in [GitHub Discussions Q&A](https://github.com/palcarazm/bs-darkmode-toggle/discussions/new?category=q-a)
- :bug: Do you find a bug? Open an issue in [GitHub bug report](https://github.com/palcarazm/bs-darkmode-toggle/issues/new?template=01-BUG_REPORT.yml)
- :bulb: Do you have a great idea? Open an issue in [GitHub feature request](https://github.com/palcarazm/bs-darkmode-toggle/issues/new?template=02-FEATURE_REQUEST.yml)
- :computer: Do you know how to fix a bug? Open a pull request in [GitHub pull request](https://github.com/palcarazm/bs-darkmode-toggle/compare).

[![GitHub Contributors](https://contrib.rocks/image?repo=palcarazm/bs-darkmode-toggle)](https://github.com/palcarazm/bs-darkmode-toggle/graphs/contributors)

¿Do you like the project? Give us a :star: in [GitHub](https://github.com/palcarazm/bs-darkmode-toggle).