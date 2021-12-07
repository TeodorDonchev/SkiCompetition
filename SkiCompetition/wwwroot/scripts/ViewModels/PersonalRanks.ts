import Competitor from "../Models/Competitor.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export default class PersonalRanksVM extends ContentVM {
    models: Array<Competitor>;
    competitors: KnockoutObservableArray<{ competitor: Competitor, teamName: string }>;
    sortedCompetitors: KnockoutComputed<{ competitor: Competitor, teamName: string }[]>;
    filterBy: KnockoutObservable<number>; // 0 - Female, 1 - Male
    selectedCompetitor: KnockoutObservable<Competitor>;
    top3Competitors: KnockoutComputed<{ competitor: Competitor, teamName: string }[]>;

    constructor(service: Service) {
        super(service);
        this.models = [];
        this.competitors = ko.observableArray([]);
        this.filterBy = ko.observable(0);
        this.sortedCompetitors = ko.computed(() => {
            return this.competitors().filter((data) => {
                return (data.competitor.sex === 'Female' && this.filterBy() === 0) || (data.competitor.sex === 'Male' && this.filterBy() === 1);
            }).sort((a, b) => b.competitor.points - a.competitor.points).slice(3);
        });
        this.top3Competitors = ko.computed(() => {
            return this.competitors().filter((data) => {
                return (data.competitor.sex === 'Female' && this.filterBy() === 0) || (data.competitor.sex === 'Male' && this.filterBy() === 1);
            }).sort((a, b) => b.competitor.points - a.competitor.points).slice(0, 3);
        });
    }

    refreshResults() {
        this.competitors([]);
        this.service.getAllCompetitors()
            .then((competitors) => {
                competitors.forEach((competitor) => {
                    this.service.readTeam(competitor.teamId).then((team) => {
                        this.competitors.push({ competitor, teamName: team.name });
                    })
                })
                console.log('all', this.competitors());
                console.log('sorted', this.sortedCompetitors());
            });
       
    }
}