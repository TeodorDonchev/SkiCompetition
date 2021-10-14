import LService from "../Services/LService.js";
import CompetitionsVM from "../ViewModels/Competition.js";
import Deck from "./Deck.js";

export class CompetitionDeck extends Deck {
    constructor(service: LService) {
        super('Competitions', service);
    }

    getContentVM(service: LService) {
        return new CompetitionsVM(service);
    }
}