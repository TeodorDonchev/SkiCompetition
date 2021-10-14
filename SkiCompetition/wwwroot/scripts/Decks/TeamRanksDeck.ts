import LService from "../Services/LService.js";
import TeamRanksVM from "../ViewModels/TeamRanks.js";
import Deck from "./Deck.js";

export default class TeamRanksDeck extends Deck {
    constructor(service: LService) {
        super('Team Ranks', service);
    }

    getContentVM(service: LService) {
        return new TeamRanksVM(service);
    }
}