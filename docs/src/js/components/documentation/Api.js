import Methods from "./api/Methods";
import Options from "./api/Options";
import DocSection from "./DocSection";

class Api extends DocSection {
    static build() {
        return super.build("api", "API", [
            Options.build(),
            Methods.build(),
        ]);
    }
}

export default Api;
