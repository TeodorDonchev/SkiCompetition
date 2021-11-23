import MotherShipVM from "./MotherShip.js";
import includeHtml from "./Services/IncludeFile.js";
import datePicker from './Bindings/datePicker.js';

datePicker.name;
declare global { interface Window { startUp: () => void; isLoading: KnockoutObservable<boolean> } }

window.startUp = () => {
    includeHtml().then(() => ko.applyBindings(new MotherShipVM(), document.body));
};

window.isLoading = ko.observable(true);