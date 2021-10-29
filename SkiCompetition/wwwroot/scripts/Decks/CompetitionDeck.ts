import Service from "../Services/Service.js";
import CompetitionsVM from "../ViewModels/Competition.js";
import Deck from "./Deck.js";

export default class CompetitionDeck extends Deck {
    constructor(service: Service) {
        super('Competitions', service);
    }

    getContentVM(service: Service) {
        return new CompetitionsVM(service);
    }
}