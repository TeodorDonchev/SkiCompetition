import Team from "../Models/Team.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export default class TeamRanksVM extends ContentVM {
    teams: KnockoutObservableArray<Team>;
    sortedTeams: KnockoutComputed<Team[]>;
    selectedTeam: KnockoutObservable<Team>;

    constructor(service: Service) {
        super(service);
        this.selectedTeam = ko.observable();
        this.teams = ko.observableArray([]);

        this.refreshResults = function () {
            this.service.getAllTeams()
                .then((teams) => {
                    this.teams(teams);
                });
        }
        this.sortedTeams = ko.computed(() => {
            return this.teams().sort((a, b) => b.points - a.points);
        });
    }
}