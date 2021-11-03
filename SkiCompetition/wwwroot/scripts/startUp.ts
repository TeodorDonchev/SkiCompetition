import MotherShipVM from "./MotherShip.js";
import includeHtml from "./Services/IncludeFile.js";


declare global { interface Window { startUp: () => void; } }

window.startUp = () => {
    includeHtml().then(() => ko.applyBindings(new MotherShipVM(), document.body));
};