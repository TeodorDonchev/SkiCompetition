import LService from "../Services/LService.js";
import CompetitorVM from "../ViewModels/Competitor.js";
import ContentVM from "../ViewModels/Content.js";
import Deck from "./Deck.js";

export default class CompetitorDeck extends Deck {
    constructor(service: LService) {
        super('Competitors', service);
    }
    getContentVM(service: LService): ContentVM {
        return new CompetitorVM(service);
    }

}