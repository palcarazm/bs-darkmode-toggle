[![GitHub license](https://img.shields.io/github/license/palcarazm/bs-darkmode-toggle.svg?color=informational)](https://github.com/palcarazm/bs-darkmode-toggle/blob/master/LICENSE)
[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode-toggle/v1?logo=github)](https://github.com/palcarazm/bs-darkmode-toggle/releases)
[![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=%5E5.3.0-alpha&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.0)
[![BS Toggle](https://img.shields.io/static/v1?label=bs-toggle&message=%5E5.0.0&color=informational)](https://palcarazm.github.io/bootstrap5-toggle/)
[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bs-darkmode-toggle?label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bs-darkmode-toggle)
[![NPM Badge](https://img.shields.io/npm/dm/bs-darkmode-toggle?logo=npm)](https://www.npmjs.com/package/bs-darkmode-toggle)
[![Build](https://img.shields.io/github/actions/workflow/status/palcarazm/bs-darkmode-toggle/build.yml?branch=v1&logo=npm)](https://github.com/palcarazm/bs-darkmode-toggle/actions?query=workflow%3A%22Build+Check%22)
[![Test](https://img.shields.io/github/actions/workflow/status/palcarazm/bs-darkmode-toggle/cypress.yml?branch=v1&label=tests&logo=cypress)](https://github.com/palcarazm/bs-darkmode-toggle/actions?query=workflow%3A%22Cypress+Tests%22)
[![Security](https://img.shields.io/snyk/vulnerabilities/npm/bs-darkmode-toggle@#version#?logo=snyk)](https://snyk.io/advisor/npm-package/bs-darkmode-toggle)
[![EOL](https://img.shields.io/endpoint?url=https%3A%2F%2Fpalcarazm.github.io%2Fbs-darkmode-toggle%2Fapi%2Feol%2Fv1)](https://github.com/palcarazm/bs-darkmode-toggle/security/policy)
[![Funding](https://img.shields.io/badge/sponsor-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/sponsors/palcarazm)
<!--[![Rate this package](https://badges.openbase.com/js/rating/bs-darkmode-toggle.svg?token=rNvznTVToo+EmX5g+KTvfYqI9+YTWJeUWTxPj7tLA6o=)](https://openbase.com/js/bs-darkmode-toggle?utm_source=embedded&utm_medium=badge&utm_campaign=rating-badge&utm_term=js/bs-darkmode-toggle)-->

# Bootstrap Darkmode Toggle
**Bootstrap Darkmode Toggle** is a plugin for bootstrap to add a ligthmode/darkmode switch in to your app.

---
#### Library Distributions

| Branch | Bootstrap Support | Last Release |
| :----: | :---------------: | :----------: |
| [bootstrap5-toggle v1](https://github.com/palcarazm/bs-darkmode-toggle/tree/v1) | [![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=%5E5.3.0-alpha&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode-toggle/v1?logo=github)](https://github.com/palcarazm/bs-darkmode-toggle/releases) |

See EOL for each version in [Security Policy Page](https://github.com/palcarazm/bs-darkmode-toggle/security/policy).
# Demos

**Demos and API Docs:** https://palcarazm.github.io/bs-darkmode-toggle/

# Related Bootstrap Plugins

<div align="center">
  <a href="https://github.com/palcarazm/bootstrap5-toggle" title="Boostrap Toggle"
    ><img
      src="https://github-readme-stats.vercel.app/api/pin/?username=palcarazm&repo=bootstrap5-toggle&border_radius=10&show_owner=true"
  /></a>
</div>

---

<!-- To update TOC run .\node_modules\.bin\doctoc README.md --github -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

# Installation

## CDN

[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bs-darkmode-toggle?label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bs-darkmode-toggle)

### ECMAS Interface

```html
<!-- Consider loading Bootstrap and Bootstrap 5 toggle dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bs-darkmode-toggle@#version#/js/bs-darkmode-toggle.ecmas.min.js"></script>
```

### jQuery Interface

```html
<!-- Consider loading Bootstrap, jQuery and Bootstrap 5 toggle dependencies -->
<script src="https://cdn.jsdelivr.net/npm/bs-darkmode-toggle@#version#/js/bs-darkmode-toggle.jquery.min.js"></script>
```

## Download

[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bs-darkmode-toggle/v1?logo=github)](https://github.com/palcarazm/bs-darkmode-toggle/releases)

## NPM

[![NPM Badge](https://img.shields.io/npm/dm/bs-darkmode-toggle?logo=npm)](https://www.npmjs.com/package/bs-darkmode-toggle)

```ksh
npm install bs-darkmode-toggle@#version#
```

## Yarn

```ksh
yarn add bs-darkmode-toggle@#version#
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

# API

## Options
Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`. Options and data attributes can be use together.

Find in the example the same toggle can be personalize vía API options and data attributes.

```html
<div data-plugin="bs-darkmode-toggle" data-state="dark" data-allowCookie data-lightColorMode="blue"></div>

<div id="bs-darkmode-toggle"></div>
<script>
  document.getElementById('bs-darkmode-toggle').bsDarkmodeToggle({
    state: false,
    allowCookie: true,
    lightColorMode: "blue"
  });
</script>
```

| Name             | Type        | Default               | Description |
| :--------------- | :---------: | :-------------------: | :---------- |
| `state`          | Boolean     | "true"                | Default light (true) or dark (false) color scheme. For data attributes use light/dark instead. |
| `root`           | String      | ":root"               | CSS selector for root element to apply color scheme. |
| `allowCookie`    | Boolean     | "false"               | Set if the user has allowed to use cookies. For data attribute the presence means true and the absence false. |
| `lightLabel`     | string/html | ![sun](https://raw.githubusercontent.com/palcarazm/bs-darkmode-toggle/v1/img/sun.svg)   | Set the light toggle label. |
| `darkLabel`      | string/html | ![moon](https://raw.githubusercontent.com/palcarazm/bs-darkmode-toggle/v1/img/moon.svg) | Set the dark toggle label. |
| `lightColorMode` | string      | "light"               | Set the light color scheme. |
| `darkColorMode`  | string      | "dark"                | Set the dark color scheme. |

## Methods
Methods can be used to control the darkmode toggle directly.

```html
<div id="bs-darkmode-toggle"></div>
<script>
  let demoElement = document.getElementById('bs-darkmode-toggle');
  demoElement.bsDarkmodeToggle({
    state: false,
    allowCookie: true,
    lightColorMode: "blue"
  });
</script>
```


| Method        | Example                                       | Description                                     |
| :------------ | :-------------------------------------------- | :---------------------------------------------- |
| `light`       | `demoElement.bsDarkmodeToggle("light")`       | Enable light color scheme.                      |
| `dark`        | `demoElement.bsDarkmodeToggle("dark")`        | Enable dark color scheme.                       |
| `toggle`      | `demoElement.bsDarkmodeToggle("toggle")`      | Switch the enable color scheme.                 |
| `allowCookie` | `demoElement.bsDarkmodeToggle("allowCookie")` | Set the Cookie Authorization status to allowed. |
| `denyCookie`  | `demoElement.bsDarkmodeToggle("denyCookie")`  | Set the Cookie Authorization status to denied.  |

# Events

## Event Propagation
When the color scheme changes a `change` event is fired from bootstrap darkmode toggle element. so you can listner for this event. 

```html
<div data-plugin="bs-darkmode-toggle" id="bs-darkmode-toggle"></div>

<div id="bs-darkmode-toggle"></div>
<script>
  let demoElement = document.getElementById('bs-darkmode-toggle');
  demoElement.addEventListener('Change',(_e)=>{
    //Do something
  });
</script>
```
## Stopping Event Propagation
Passing `true` to the `light`, `dark` and `toggle` methods will enable the silent option to prevent firing the `change` event in cases where you want to update the color scheme but do not want to fire the `change` event.


# Collaborators welcom!

- :sos: ¿Do you need some help? Open a question in [GitHub Discussion](https://github.com/palcarazm/bs-darkmode-toggle/discussions/categories/q-a)
- :bug: ¿Do you find a bug? Open a issue in [GitHub bug report](https://github.com/palcarazm/bs-darkmode-toggle/issues/new?assignees=-&labels=bug&template=bug_report.yml&title=Provide+a+general+summary+of+the+issue)
- :bulb: ¿Do you have a great idea? Open a issue in [GitHub feature request](https://github.com/palcarazm/bs-darkmode-toggle/issues/new?assignees=&labels=feature&template=feature_request.yml&title=Provide+a+general+summary+of+the+feature)
- :computer: ¿Do you know how to fix a bug? Open a pull request in [GitHub pull repuest](https://github.com/palcarazm/bs-darkmode-toggle/compare).

[![GitHub Contributors](https://contrib.rocks/image?repo=palcarazm/bs-darkmode-toggle)](https://github.com/palcarazm/bs-darkmode-toggle/graphs/contributors)

¿Do you like the project? Give us a :star: in [GitHub](https://github.com/palcarazm/bs-darkmode-toggle).