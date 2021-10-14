import LService from "../Services/LService.js";
import ContentVM from "../ViewModels/Content.js";
import PersonalRanksVM from "../ViewModels/PersonalRanks.js";
import Deck from "./Deck.js"

export default class PersonalRanksDeck extends Deck{
    name: string;

    constructor(service: LService) {
        super('Personal Ranks', service);
    }

    getContentVM(service: LService): ContentVM {
        return new PersonalRanksVM(service);
    }
}