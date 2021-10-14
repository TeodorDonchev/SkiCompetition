import { CompetitionDeck } from "./Decks/CompetitionDeck.js";
import CompetitorDeck from "./Decks/CompetitorDeck.js";
import Deck from "./Decks/Deck.js";
import PersonalRanksDeck from "./Decks/PersonalRanksDeck.js";
import TeamDeck from "./Decks/TeamDeck.js";
import TeamRanksDeck from "./Decks/TeamRanksDeck.js";
import Competition from "./Models/Competition.js";
import Competitor from "./Models/Competitor.js";
import Team from "./Models/Team.js";
import LService from "./Services/LService.js";


export default class MotherShipVM {
    Service: LService;
    ActiveDeck: KnockoutObservable<Deck>;
    Decks: Array<Deck>;

    constructor() {
        this.Service = new LService();
      
        this.Decks = [
            new CompetitionDeck(this.Service),
            new CompetitorDeck(this.Service),
            new TeamDeck(this.Service),
            new PersonalRanksDeck(this.Service),
            new TeamRanksDeck(this.Service),
        ];
        this.ActiveDeck = ko.observable(this.Decks[0]);
    }

    //changeFilterCompetition(data, event) {
    //    let element = event.target;

    //    if (element.outerText === 'FINISHED') {
    //        this.Competitions(this.Service.getPastCompetitions());
    //    } else {
    //        this.Competitions(this.Service.getUpcomingCompetitions());
    //    }
    //}

    //addTeam(formElement) {
    //    //TODO
    //}

    //addCompetition(formElement) {
    //    this.competition = new Competition(1, this.name(), this.date(), this.location(), [], false);
    //    this.Service.addCompetition(this.competition);
    //    this.Competitions(this.Service.getAllCompetitions());
    //}

    //addCompetitor(formElement) {
    //    let data = new FormData(formElement);
    //    console.log(data);
    //    console.log(formElement);
    //}

    //clearFilterCompetition() {
    //    this.Competitions(this.Service.getAllCompetitions());
    //}

    //changeFilterCompetitor(data, event) {
    //    let element = event.target;
    //    if (element.outerText === 'FEMALE') {
    //        this.SortedCompetitors(this.Service.getSortedFemaleCompetitors());
    //    } else {
    //        this.SortedCompetitors(this.Service.getSortedMaleCompetitors());
    //    }
    //}
}