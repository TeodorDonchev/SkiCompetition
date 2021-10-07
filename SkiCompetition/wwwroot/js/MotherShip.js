import Service from "./Service.js";
class ContentVM {
    constructor(Name) {
        this.Name = Name;
        this.templateName = Name + "-template";
    }
}
class Deck {
    constructor(Name) {
        this.Name = Name;
        this.contentVM = new ContentVM(Name);
    }
}
export default class MotherShipVM {
    constructor() {
        this.Service = new Service();
        this.Competitors = this.Service.getAllCompetitors();
        this.Competitions = ko.observableArray(this.Service.getAllCompetitions());
        this.SortedCompetitors = ko.observableArray(this.Service.getSortedFemaleCompetitors());
        this.SortedTeams = this.Service.getSortedTeams();
        this.Teams = this.Service.getAllTeams();
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
        if (event.target.outerText === 'PAST') {
            this.Competitions(this.Service.getPastCompetitions());
        }
        else {
            this.Competitions(this.Service.getUpcomingCompetitions());
        }
    }
    changeFilterCompetitor(data, event) {
        let element = event.target;
        if (element.outerText === 'FEMALE') {
            this.SortedCompetitors(this.Service.getSortedFemaleCompetitors());
        }
        else {
            this.SortedCompetitors(this.Service.getSortedMaleCompetitors());
        }
    }
}
//# sourceMappingURL=MotherShip.js.map