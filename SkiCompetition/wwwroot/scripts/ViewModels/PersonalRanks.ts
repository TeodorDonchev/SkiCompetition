import Competitor from "../Models/Competitor.js";
import LService from "../Services/LService.js";
import ContentVM from "./Content.js";

export default class PersonalRanksVM extends ContentVM {
    models: Array<Competitor>;
    sortedFemaleCompetitors: KnockoutObservableArray<Competitor>;
    sortedMaleCompetitors: KnockoutObservableArray<Competitor>;
    selectedCompetitor: KnockoutObservable<Competitor>;

    constructor(service: LService) {
        super(service);
        this.models = [];
        this.sortedFemaleCompetitors = ko.observableArray([]);
        this.sortedMaleCompetitors = ko.observableArray([]);

        service.getSortedFemaleCompetitors().then((competitors) => {
            this.models = competitors;
            this.sortedFemaleCompetitors(competitors);
        });
        service.getSortedMaleCompetitors().then((competitors) => {
            this.models = competitors;
            this.sortedMaleCompetitors(competitors);
        });
    }
}