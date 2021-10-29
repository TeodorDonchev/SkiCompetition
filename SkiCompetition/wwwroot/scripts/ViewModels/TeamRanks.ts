import Team from "../Models/Team.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export default class TeamRanksVM extends ContentVM {
    models: Array<Team>;
    sortedTeams: KnockoutObservableArray<Team>;
    selectedTeam: KnockoutObservable<Team>;

    constructor(service: Service) {
        super(service);
        this.models = [];
        this.sortedTeams = ko.observableArray([]);
        this.selectedTeam = ko.observable();

        service.getSortedTeams().then((teams) => {
            this.models = teams;
            this.sortedTeams(teams);
        })
    }
}