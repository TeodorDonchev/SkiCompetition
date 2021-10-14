import Competition from "../Models/Competition.js";
import LService from "../Services/LService.js";
import ContentVM  from "./Content.js";

export default class CompetitionsVM extends ContentVM {
    models: Array<Competition>;
    competitions: KnockoutObservableArray<Competition>;
    pastCompetitions: KnockoutObservableArray<Competition>;
    upcomingCompetitions: KnockoutObservableArray<Competition>;
    selectedCompetition: KnockoutObservable<Competition>;

    constructor(service: LService) {
        super(service);
        this.models = [];
        this.competitions = ko.observableArray([]);
        this.selectedCompetition = ko.observable();
        this.pastCompetitions = ko.observableArray([]);
        this.upcomingCompetitions = ko.observableArray([]);

        service.getAllCompetition()
            .then((competitions) => {
                console.log('competitions: ', competitions);
                this.models = competitions;
                this.competitions(competitions);
            })

        service.getPastCompetitions().then((competitions) => {
            this.pastCompetitions(competitions);
        })

        service.getUpcomingCompetitions().then((competitions) => {
            this.upcomingCompetitions(competitions);
        })
    }

}