import Team from "../Models/Team.js";
import LService from "../Services/LService.js";
import ContentVM from "./Content.js";

export class TeamsDialogVM {

    name: KnockoutObservable<string>;
    competitors: KnockoutObservableArray<number>;
    points: KnockoutObservable<number>;

    constructor(private model: Team, private onFinish: (team: Team) => void, private isEdit: boolean = false) {
        this.name = ko.observable(model.name);
        this.competitors = ko.observableArray(model.competitors);
        this.points = ko.observable(model.points);
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

    constructor(service: LService) {
        super(service);
        this.teams = ko.observableArray([]);
        this.selectedTeam = ko.observable();
        this.activeTeam = ko.observable(null);

        this.refreshResults();
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

    refreshResults() {
        this.service.getAllTeams()
            .then((teams) => {
                this.teams(teams);
            });
    }
}