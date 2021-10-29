import Service from "../Services/Service.js";
import ContentVM from "../ViewModels/Content.js";
import TeamVM from "../ViewModels/Team.js";
import Deck from "./Deck.js";

export default class TeamDeck extends Deck {
    constructor(service: Service) {
        super('Teams', service);
    }

    getContentVM(service: Service): ContentVM {
        return new TeamVM(service);
    }
}