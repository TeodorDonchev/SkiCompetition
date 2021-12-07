import Team from "../Models/Team.js";
import Competitor from "../Models/Competitor.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

let defaultTeam = new Team(0, '', 0);

export class TeamsDialogVM {
    id: KnockoutObservable<number>;
    name: KnockoutObservable<string>;
    competitors: KnockoutObservableArray<number>;
    points: KnockoutObservable<number>;
    competitorsInTeam: KnockoutObservableArray<Competitor>;
    competitorsOutOfTeam: KnockoutObservableArray<Competitor>;
    selectedCompetitorId: KnockoutObservable<number>;
    updatedCompetitors: Competitor[];

    constructor(private onFinish: (team: Team, updatedCompetitors: Competitor[]) => void,
        competitorTeamRelations: { competitorsInTeam: Competitor[], competitorsOutOfTeam: Competitor[] },
        private model: Team = defaultTeam) {

        this.id = ko.observable(model.id);
        this.name = ko.observable(model.name);
        this.competitors = ko.observableArray(model.competitors);
        this.points = ko.observable(model.points);
        this.competitorsInTeam = ko.observableArray(competitorTeamRelations.competitorsInTeam);
        this.competitorsOutOfTeam = ko.observableArray(competitorTeamRelations.competitorsOutOfTeam);
        this.selectedCompetitorId = ko.observable();
        this.updatedCompetitors = [];
    }

    addCompetitor() {
        if (!this.selectedCompetitorId()) {
            return;
        }
        let competitor = this.competitorsOutOfTeam().find(c => c.id === this.selectedCompetitorId());
        this.competitorsInTeam.push(competitor);
        this.competitorsOutOfTeam.remove(competitor);
        competitor.teamId = this.id();
        this.updatedCompetitors.push(competitor);
    }

    isCreate() {
        return this.model != defaultTeam;
    }

    flushResult() {
        this.onFinish(new Team(this.id(), this.name(), this.points(), this.competitors()), this.updatedCompetitors);
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

    }

    getCompetitorsTeamRelations(teamId: number): Promise<{ competitorsInTeam: Competitor[], competitorsOutOfTeam: Competitor[] }> {
        return new Promise((resolve, reject) => {
            let competitorsTeamRelations = { competitorsInTeam: [], competitorsOutOfTeam: [] };
            this.service.getAllCompetitors().then((competitors) => {
                competitors.forEach((competitor) => {
                    if (competitor.teamId === teamId) {
                        competitorsTeamRelations.competitorsInTeam.push(competitor);
                    } else {
                        competitorsTeamRelations.competitorsOutOfTeam.push(competitor);
                    }
                });
                resolve(competitorsTeamRelations);
            });
        });
    }

    changeTeamOfCompetitors(updatedCompetitors: Array<Competitor>) {
        if (updatedCompetitors.length > 0) {
            updatedCompetitors.forEach((competitor) => {
                console.log('competiro to update', competitor);
                this.service.updateCompetitor(competitor.id, new Competitor(competitor.id, competitor.firstName, competitor.lastName, competitor.sex, competitor.teamId, competitor.points)).then((id) => {
                    this.refreshResults();
                })
            });
        } else {
            this.refreshResults();
        }
    }

    createNewTeam() {
        this.getCompetitorsTeamRelations(-1).then((competitorTeamRelations) => {
            this.activeTeam(new TeamsDialogVM((newTeam: Team, updatedCompetitors: Competitor[]) => {
                this.service.createTeam(newTeam).then((id) => {
                    this.changeTeamOfCompetitors(updatedCompetitors);
                    this.activeTeam(null);
                });
            }, competitorTeamRelations));
        })
    }

    editTeam(team: Team) {
        this.getCompetitorsTeamRelations(team.id).then((competitorsTeamRelations) => {
            this.activeTeam(new TeamsDialogVM((updatedTeam: Team, updatedCompetitors: Competitor[]) => {
                this.service.updateTeam(updatedTeam.id, updatedTeam).then((id) => {
                    this.changeTeamOfCompetitors(updatedCompetitors);
                    this.activeTeam(null);
                });
            }, competitorsTeamRelations, team));
        })
    }

    refreshResults() {
        this.service.getAllTeams()
            .then((teams) => {
                this.teams(teams);
            });
    };
}