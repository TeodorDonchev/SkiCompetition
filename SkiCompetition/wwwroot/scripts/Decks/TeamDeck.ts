import LService from "../Services/LService.js";
import ContentVM from "../ViewModels/Content.js";
import TeamVM from "../ViewModels/Team.js";
import Deck from "./Deck.js";

export default class TeamDeck extends Deck {
    constructor(service: LService) {
        super('Teams', service);
    }

    getContentVM(service: LService): ContentVM {
        return new TeamVM(service);
    }
}