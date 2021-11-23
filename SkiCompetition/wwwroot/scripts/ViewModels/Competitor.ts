import Competitor from "../Models/Competitor.js";
import Team from "../Models/Team.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";


let defaultCompetitor = new Competitor(0, '', '', '', -1, 0);

export class CompetitorsDialogVM {
    id: KnockoutObservable<number>;
    firstName: KnockoutObservable<string>;
    lastName: KnockoutObservable<string>;
    sex: KnockoutObservable<string>;
    points: KnockoutObservable<number>;
    teamId: KnockoutObservable<number>;

    constructor(private onFinish: (competitor: Competitor) => void, private teams: Team[], private model: Competitor = defaultCompetitor) {
        console.log('model', model);
        this.id = ko.observable(this.model.id);
        this.firstName = ko.observable(this.model.firstName);
        this.lastName = ko.observable(this.model.lastName);
        this.sex = ko.observable(this.model.sex);
        this.points = ko.observable(this.model.points);
        this.teamId = ko.observable(this.model.teamId);
    }

    isCreate() {
        return this.model != defaultCompetitor;
    }

    flushResult() {
        this.onFinish(new Competitor(this.id(), this.firstName(), this.lastName(), this.sex(), this.teamId(), this.points()));
    }
}


export default class CompetitorVM extends ContentVM {
    competitors: KnockoutObservableArray<{ competitor: Competitor, teamName: string }>;
    teams: KnockoutObservableArray<Team>;
    activeCompetitor: KnockoutObservable<CompetitorsDialogVM>;
    selectedCompetitor: KnockoutObservable<Competitor>;

    constructor(service: Service) {
        super(service);
        this.competitors = ko.observableArray([]);
        this.activeCompetitor = ko.observable(null);
        this.selectedCompetitor = ko.observable();
        this.teams = ko.observableArray();
    }

    createNewCompetitor() {
        this.activeCompetitor(new CompetitorsDialogVM((newCompetitor: Competitor) => {
            this.service.createCompetitor(newCompetitor).then((id) => {
                this.refreshResults();
                this.activeCompetitor(null);
            });
        }, this.teams()));
    }

    editCompetitor(editedCompetitor: Competitor) {
        this.activeCompetitor(new CompetitorsDialogVM((updatedCompetitor: Competitor) => {
            this.service.updateCompetitor(updatedCompetitor.id, updatedCompetitor).then((id) => {
                this.refreshResults();
                this.activeCompetitor(null);
            });
        }, this.teams(), editedCompetitor));
    }

    deleteCompetitor(id: number) {
        this.service.deleteCompetitor(id).then(() => this.refreshResults());
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
            });
        this.service.getAllTeams().then((teams) => this.teams(teams));
    }

}