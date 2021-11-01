import Team from "../Models/Team.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export class TeamsDialogVM {

    name: KnockoutObservable<string>;
    competitors: KnockoutObservableArray<number>;
    points: KnockoutObservable<number>;

    constructor(private model: Team, private onFinish: (team: Team) => void, private isEdit: boolean = false) {
        this.name = isEdit ? ko.observable(model.name) : ko.observable();
        this.competitors = isEdit ? ko.observableArray(model.competitors) : ko.observableArray();
        this.points = isEdit ? ko.observable(model.points) : ko.observable();
    }

    flushResult() {
        this.model.name = this.name();
        this.model.competitors = this.competitors();
        this.model.points = this.points();
        this.onFinish(this.model);
    }
}
export default class TeamVM extends ContentVM {

    teams: KnockoutObservableArray<Team>;
    activeTeam: KnockoutObservable<TeamsDialogVM>;
    selectedTeam: KnockoutObservable<Team>;

    constructor(service: Service) {
        super(service);
        this.teams = ko.observableArray([]);
        this.selectedTeam = ko.observable();
        this.activeTeam = ko.observable(null);

        this.refreshResults = function () {
            this.service.getAllTeams()
                .then((teams) => {
                    this.teams(teams);
                });
        };
    }

    createNewTeam() {
        this.activeTeam(new TeamsDialogVM(this.service.createNewTeam(), (newTeam: Team) => {
            this.service.createTeam(newTeam).then((id) => {
                //this.refreshResults();
                this.teams.push(newTeam);
                this.activeTeam(null);
            });
        }));
    }

    editTeam(editedTeam: Team) {
        this.activeTeam(new TeamsDialogVM(editedTeam, (updatedTeam: Team) => {
            this.service.updateTeam(editedTeam.id, editedTeam).then((id) => {
                this.refreshResults();
                this.activeTeam(null);
            });
        }, true));
    }
}