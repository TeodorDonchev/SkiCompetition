
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
    Decks: Array<Deck>;
    ActiveDeck: KnockoutObservable<Deck>;
    constructor() {
        this.Decks = [
            new Deck("Competitions"),
            new Deck("Competitors"),
            new Deck("Teams"),
            new Deck("Ranks"),
        ];
        this.ActiveDeck = ko.observable(this.Decks[0]);
    }
}