import Team from "../Models/Team.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export default class TeamRanksVM extends ContentVM {
    teams: KnockoutObservableArray<Team>;
    sortedTeams: KnockoutComputed<Team[]>;
    selectedTeam: KnockoutObservable<Team>;
    top3Teams: KnockoutComputed<Team[]>;

    constructor(service: Service) {
        super(service);
        this.selectedTeam = ko.observable();
        this.teams = ko.observableArray([]);
        this.sortedTeams = ko.computed(() => {
            return this.teams().sort((a, b) => b.points - a.points).slice(3);
        });
        this.top3Teams = ko.computed(() => {
            return this.teams().sort((a, b) => b.points - a.points).slice(0, 3);
        });
    }

    refreshResults() {
        this.service.getAllTeams()
            .then((teams) => {
                this.teams(teams);
            });
    }
}