import Team from "../Models/Team.js";
import LService from "../Services/LService.js";
import ContentVM from "./Content.js";

export default class TeamVM extends ContentVM {
    models: Array<Team>;
    teams: KnockoutObservableArray<Team>;
    selectedTeam: KnockoutObservable<Team>;

    constructor(service: LService) {
        super(service);
        this.models = [];
        this.teams = ko.observableArray([]);
        this.selectedTeam = ko.observable();

        service.getAllTeams().then((teams) => {
            this.models = teams;
            this.teams(teams);
        })
    }
}