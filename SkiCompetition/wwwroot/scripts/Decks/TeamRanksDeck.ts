import Service from "../Services/Service.js";
import TeamRanksVM from "../ViewModels/TeamRanks.js";
import Deck from "./Deck.js";

export default class TeamRanksDeck extends Deck {
    constructor(service: Service) {
        super('Team Ranks', service);
    }

    getContentVM(service: Service) {
        return new TeamRanksVM(service);
    }
}