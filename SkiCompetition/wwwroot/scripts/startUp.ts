import MotherShipVM from "../js/MotherShip.js";

declare global { interface Window { startUp: () => void; } }

window.startUp = () => { ko.applyBindings(new MotherShipVM(), document.body); };