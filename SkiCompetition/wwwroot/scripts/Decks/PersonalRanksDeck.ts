import Service from "../Services/Service.js";
import ContentVM from "../ViewModels/Content.js";
import PersonalRanksVM from "../ViewModels/PersonalRanks.js";
import Deck from "./Deck.js"

export default class PersonalRanksDeck extends Deck{
    name: string;

    constructor(service: Service) {
        super('Personal Ranks', service);
    }

    getContentVM(service: Service): ContentVM {
        return new PersonalRanksVM(service);
    }
}