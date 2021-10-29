import Service from "../Services/Service.js";
import CompetitorVM from "../ViewModels/Competitor.js";
import ContentVM from "../ViewModels/Content.js";
import Deck from "./Deck.js";

export default class CompetitorDeck extends Deck {
    constructor(service: Service) {
        super('Competitors', service);
    }

    getContentVM(service: Service): ContentVM {
        return new CompetitorVM(service);
    }
}