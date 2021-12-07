import CompetitionDeck from "./Decks/CompetitionDeck.js";
import CompetitorDeck from "./Decks/CompetitorDeck.js";
import Deck from "./Decks/Deck.js";
import PersonalRanksDeck from "./Decks/PersonalRanksDeck.js";
import TeamDeck from "./Decks/TeamDeck.js";
import TeamRanksDeck from "./Decks/TeamRanksDeck.js";
import Service from "./Services/Service.js";



export default class MotherShipVM {
    Service: Service;
    ActiveDeck: KnockoutObservable<Deck>;
    Decks: Array<Deck>;
    loading: KnockoutObservable<boolean>;

    constructor() {
        this.loading = ko.observable(true);

        this.Service = new Service(this.loading);

        this.Decks = [
            new CompetitionDeck(this.Service),
            new CompetitorDeck(this.Service),
            new TeamDeck(this.Service),
            new PersonalRanksDeck(this.Service),
            new TeamRanksDeck(this.Service),
        ];
        this.ActiveDeck = ko.observable();

        this.ActiveDeck.subscribe((newValue) => {
            newValue.contentVM.refreshResults();
        });

        this.ActiveDeck(this.Decks[0]);
    }
}