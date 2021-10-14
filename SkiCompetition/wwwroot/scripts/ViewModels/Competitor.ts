import Competitor from "../Models/Competitor.js";
import LService from "../Services/LService.js";
import ContentVM from "./Content.js";

export default class CompetitorVM extends ContentVM {
    models: Array<Competitor>;
    competitors: KnockoutObservableArray<Competitor>;
    selectedCompetitor: KnockoutObservable<Competitor>;

    constructor(service: LService) {
        super(service);
        this.models = [];
        this.competitors = ko.observableArray([]);
        this.selectedCompetitor = ko.observable(null);

        service.getAllCompetitors().then((competitors) => {
            this.models = competitors;
            this.competitors(competitors);
        });
    }
}