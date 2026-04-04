import DocArticle from "../DocArticle";

class Options extends DocArticle {
    static build() {
        return super.build({
            title: "Options",
            description: Options.#description(),
            example: Options.#example(),
            codePanel: Options.#codePanel(),
        });
    }

    static #codePanel() {
        const ecmas = `<div id="api-option-toggle-container" class="d-flex justify-content-between align-items-center p-3 bg-body border">
  <div id="api-option-toggle"></div>
  <button class="btn btn-outline-secondary" id="api-option-toggle-button">Launch bs Darkmode Toggle</button>
</div>
<script>
  document
    .getElementById('api-option-toggle-button')
    .addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('api-option-toggle')
        .bsDarkmodeToggle({
          state: false,
          root: "#api-option-toggle-container",
          allowCookie: false,
          lightLabel: "Good Morning",
          darkLabel: "Good Evening",
          lightColorMode: "blue",
          darkColorMode: "red",
          style: "primary",
        });
    });
</script>`;
        const jquery = `<div id="api-option-toggle-container" class="d-flex justify-content-between align-items-center p-3 bg-body border">
  <div id="api-option-toggle"></div>
  <button class="btn btn-outline-secondary" id="api-option-toggle-button">Launch bs Darkmode Toggle</button>
</div>
<script>
  $('#api-option-toggle-button')
    .on('click', (e) => {
      e.preventDefault();
      $('#api-option-toggle')
        .bsDarkmodeToggle({
          state: false,
          root: "#api-option-toggle-container",
          allowCookie: false,
          lightLabel: "Good Morning",
          darkLabel: "Good Evening",
          lightColorMode: "blue",
          darkColorMode: "red",
          style: "primary",
        });
    });
</script>`;
        return {
            name: "api-options",
            language: "javascript",
            tabs: ["ECMAScript", "jQuery"],
            contents: [ecmas, jquery],
        };
    }

    static #example() {
        const container = document.createElement("div");
        container.id = "api-option-toggle-container";
        container.className = "d-flex justify-content-between align-items-center p-3 bg-body border";

        const toggle = document.createElement("div");
        toggle.id = "api-option-toggle";

        const button = document.createElement("button");
        button.type = "submit";
        button.className = "btn btn-outline-secondary";
        button.innerHTML = "Launch bs Darkmode Toggle";

        container.append(toggle, button);

        button.onclick = (e) => {
            e.preventDefault();
            toggle.bsDarkmodeToggle({
                state: false,
                root: "#api-option-toggle-container",
                allowCookie: false,
                lightLabel: "Good Morning",
                darkLabel: "Good Evening",
                lightColorMode: "blue",
                darkColorMode: "red",
                style: "primary",
            });
        };

        return [container];
    }

    static #description() {
        const description = document.createElement("div");
        description.innerHTML = `<p>Options can be passed via data attributes or JavaScript. Data attributes will take precedence over JavaScript options.</p>
<div class="table-responsive">
    <table class="table table-striped table-condensed">
        <caption>API constructor options</caption>
        <thead>
            <tr>
                <th>Option</th>
                <th>Attribute</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>state</code></td>
                <td><code>data-state</code></td>
                <td class="text-nowrap">boolean</td>
                <td><code>true</code></td>
                <td>
                  Default light (true) or dark (false) color scheme.<br>
                  <small class="text-muted">For data attributes use <code>data-state="light"</code> or <code>data-state="dark"</code> instead.</small>
                </td>
            </tr>
            <tr>
                <td><code>root</code></td>
                <td><code>data-root</code></td>
                <td>string | html</td>
                <td><code>":root"</code></td>
                <td>CSS selector for root element to apply color scheme.</td>
            </tr>
            <tr>
                <td><code class="text-nowrap">allowCookie</code></td>
                <td><code class="text-nowrap">data-allow-cookie</code></td>
                <td>boolean</td>
                <td><code class="text-nowrap">false</code></td>
                <td>
                    Set if the user has allowed to use cookies.<br>
                    <small class="text-muted">For data attribute the presence means <code>true</code> and the absence <code>false</code>.</small>
                </td>
            </tr>
            <tr>
                <td><code class="text-nowrap">lightLabel</code></td>
                <td><code class="text-nowrap">data-light-label</code></td>
                <td>string | html</td>
                <td><code class="text-nowrap">"Light"</code></td>
                <td>
                    Set the light toggle label.
                </td>
            </tr>
            <tr>
                <td><code class="text-nowrap">darkLabel</code></td>
                <td><code class="text-nowrap">data-dark-label</code></td>
                <td>string | html</td>
                <td><code class="text-nowrap">"Dark"</code></td>
                <td>
                    Set the dark toggle label.
                </td>
            </tr>
            <tr>
                <td><code class="text-nowrap">style</code></td>
                <td><code class="text-nowrap">data-style</code></td>
                <td>string</td>
                <td><code class="text-nowrap">"outline-secondary"</code></td>
                <td>
                    Style of the toggle.<br>Possible values are:
                    <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>,
                    <code>warning</code>, <code>info</code>, <code>light</code>, <code>dark</code><br>
                    and their <code>outline</code> variants as <code>outline-primary</code>.
            </tr>
            <tr>
                <td><code class="text-nowrap">lightColorMode</code></td>
                <td><code class="text-nowrap">data-light-color-mode</code></td>
                <td>string</td>
                <td><code class="text-nowrap">"light"</code></td>
                <td>Set the light color scheme</td>
            </tr>
            <tr>
                <td><code class="text-nowrap">darkColorMode</code></td>
                <td><code class="text-nowrap">data-dark-color-mode</code></td>
                <td>string</td>
                <td><code class="text-nowrap">"dark"</code></td>
                <td>Set the dark color scheme</td>
            </tr>
        </tbody>
    </table>
</div>`;
        return description;
    }
}

export default Options;
