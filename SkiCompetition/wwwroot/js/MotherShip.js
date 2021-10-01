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
        this.Decks = [
            new Deck("Competitions"),
            new Deck("Competitors"),
            new Deck("Teams"),
            new Deck("Ranks"),
        ];
        this.ActiveDeck = ko.observable(this.Decks[0]);
    }
}
//# sourceMappingURL=MotherShip.js.map