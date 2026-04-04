import DocArticle from "../DocArticle";

class Cookie {
    static build() {
        return DocArticle.build({
            title: "Prefered Color Scheme in Cookie",
            description: Cookie.#description(),
        });
    }

    static #description() {
        const description = document.createElement("div");

        const paragraph = document.createElement("p");
        paragraph.innerHTML = "Bootstrap Darkmode Toggle can save user prefered color schema in a cookie. To enable this feature add <code>data-allow-cookie</code> attribute or use API method.";
        description.append(paragraph);

        const alert = document.createElement("div");
        alert.className = "alert alert-info";
        alert.role = "alert";
        alert.innerHTML = `<p><small>As per the GDPR and ePrivacy Directive, a website must ask its users' consent to use cookies that are not necessary for accessing the website's functionalities. These cookies need consent because they collect user data for their purposes. According to the law, collecting data without users' consent is unlawful.</small></p>
<p><small>The employed cookie is a User interface (UI) customization cookie that do not requiere a explicit authorization. However the default value is set to false in order to allow requesting cookie consent if wanted.</small></p>`;
        description.append(alert);

        return description;
    }

    
}
export default Cookie;
