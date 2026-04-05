import DocSection from "./DocSection";
import State from "./features/State";
import Root from "./features/Root";
import Label from "./features/Label";
import Style from "./features/Style";
import ColorScheme from "./features/ColorScheme";
import Storage from "./features/Storage";

class Features extends DocSection {
    static build() {
        return super.build("features", "Features", [
            State.build(),
            Root.build(),
            Label.build(),
            Style.build(),
            ColorScheme.build(),
            Storage.build(),
        ]);
    }
}

export default Features;
