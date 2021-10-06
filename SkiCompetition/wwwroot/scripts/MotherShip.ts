import Competition from "./Models/Competition";
import Competitor from "./Models/Competitor";
import Service from "./service";

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
    Competitions: Array<Competition>;
    Decks: Array<Deck>;
    ActiveDeck: KnockoutObservable<Deck>;
    constructor() {
        this.Service = new Service();
        this.Competitors = this.Service.competitors;
        this.Competitions = this.Service.competitions;
        this.Decks = [
            new Deck("Competitions"),
            new Deck("Competitors"),
            new Deck("Teams"),
            new Deck("Ranks"),
        ];
        this.ActiveDeck = ko.observable(this.Decks[0]);
        

    }
}