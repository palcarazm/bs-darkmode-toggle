import DocSection from "./DocSection";
import EventPropagation from "./events/EventPropagation";
import CustomEvents from "./events/CustomEvents";
import SilencedActions from "./events/SilencedActions";

class Events extends DocSection {
    static build() {
        return super.build("events", "Events", [
            EventPropagation.build(),
            CustomEvents.build(),
            SilencedActions.build(),
        ]);
    }
}

export default Events;
