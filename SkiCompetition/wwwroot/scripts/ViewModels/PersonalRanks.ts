import Competitor from "../Models/Competitor.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export default class PersonalRanksVM extends ContentVM {
    models: Array<Competitor>;
    competitors: KnockoutObservableArray<Competitor>;
    sortedCompetitors: KnockoutComputed<Competitor[]>;
    filterBy: KnockoutObservable<number>; // 0 - Female, 1 - Male
    selectedCompetitor: KnockoutObservable<Competitor>;

    constructor(service: Service) {
        super(service);
        this.models = [];
        this.competitors = ko.observableArray([]);
        this.filterBy = ko.observable(0);

        this.sortedCompetitors = ko.computed(() => {
            return this.competitors().filter((competitor) => {
                return (competitor.sex === 'Female' && this.filterBy() === 0) || (competitor.sex === 'Male' && this.filterBy() === 1);
            }).sort((a, b) => b.points - a.points);
        });

        this.refreshResults = function () {
            this.service.getAllCompetitors()
                .then((competitors) => {
                    this.competitors(competitors);
                });
        }
    }
}