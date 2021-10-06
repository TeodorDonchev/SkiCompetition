import Competition from "./Models/Competition.js";
import Competitor from "./Models/Competitor.js";
import Team from "./Models/Team.js";
import Service from "./Service.js";

class ContentVM {
    public templateName: string;
    constructor(public Name: string) {
        this.templateName = Name + "-template";
    }
}

class Deck {
    public contentVM: ContentVM;
    
    constructor(public Name: string) {
        this.contentVM = new ContentVM(Name);
    }
}

export default class MotherShipVM {
    Service: Service;
    Competitors: Array<Competitor>;
    Competitions: KnockoutObservableArray<Competition>;
    OrderedCompetitors: KnockoutObservableArray<Competitor>;
    OrderedTeams: Array<Team>;
    Teams: Array<Team>;
    Decks: Array<Deck>;
    ActiveDeck: KnockoutObservable<Deck>;

    constructor() {
        this.Service = new Service();
        this.Competitors = this.Service.competitors;
        this.Competitions = ko.observableArray(this.Service.competitions);
        this.OrderedCompetitors = ko.observableArray(this.Service.orderedFemaleCompetitors);
        this.OrderedTeams = this.Service.orderedTeams;
        this.Teams = this.Service.teams;
        this.Decks = [
            new Deck("Competitions"),
            new Deck("Competitors"),
            new Deck("Teams"),
            new Deck("Personal Ranks"),
            new Deck("Team Ranks"),
        ];
        this.ActiveDeck = ko.observable(this.Decks[0]);
    }

    changeFilterCompetition(data, event) {
        console.log(event);
        if (event.target.outerText === 'PAST') {
            this.Competitions(this.Service.pastCompetitions);
        } else {
            this.Competitions(this.Service.upcomingCompetitions);
        }
    }

    changeFilterCompetitor(data, event) {
        console.log(this);
        console.log('data',data);
        console.log('event', event.target.outerText);
        if (event.target.outerText === 'FEMALE') {
            this.OrderedCompetitors(this.Service.orderedFemaleCompetitors);
        } else {
            this.OrderedCompetitors(this.Service.orderedMaleCompetitors);
        }
    }
}