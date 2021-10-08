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
    SortedCompetitors: KnockoutObservableArray<Competitor>;
    SortedTeams: Array<Team>;
    Teams: Array<Team>;
    Decks: Array<Deck>;
    ActiveDeck: KnockoutObservable<Deck>;
    competition: Competition;
    name: KnockoutObservable<string>;
    location: KnockoutObservable<string>;
    date: KnockoutObservable<Date>;

    firstName: KnockoutObservable<string>;
    lastName: KnockoutObservable<string>;
    sex: KnockoutObservable<string>;
    team: KnockoutObservable<Team>;

    teamName: KnockoutObservable<string>;

    constructor() {
        this.Service = new Service();
        this.Competitors = this.Service.getAllCompetitors();
        this.Competitions = ko.observableArray(this.Service.getAllCompetitions());
        this.SortedCompetitors = ko.observableArray(this.Service.getSortedFemaleCompetitors());
        this.SortedTeams = this.Service.getSortedTeams();
        this.Teams = this.Service.getAllTeams();

        this.name = ko.observable();
        this.location = ko.observable();
        this.date = ko.observable();

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
        let element = event.target;

        if (element.outerText === 'FINISHED') {
            this.Competitions(this.Service.getPastCompetitions());
        } else {
            this.Competitions(this.Service.getUpcomingCompetitions());
        }
    }

    addTeam(formElement) {
        //TODO
    }

    addCompetition(formElement) {
        this.competition = new Competition(1, this.name(), this.date(), this.location(), [], false);
        this.Service.addCompetition(this.competition);
        this.Competitions(this.Service.getAllCompetitions());
    }

    addCompetitor(formElement) {
        let data = new FormData(formElement);
        console.log(data);
        console.log(formElement);
    }

    clearFilterCompetition() {
        this.Competitions(this.Service.getAllCompetitions());
    }

    changeFilterCompetitor(data, event) {
        let element = event.target;
        if (element.outerText === 'FEMALE') {
            this.SortedCompetitors(this.Service.getSortedFemaleCompetitors());
        } else {
            this.SortedCompetitors(this.Service.getSortedMaleCompetitors());
        }
    }
}