﻿import Competitor from "../Models/Competitor.js";
import Team from "../Models/Team.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export class CompetitorsDialogVM {
    id: KnockoutObservable<number>;
    firstName: KnockoutObservable<string>;
    lastName: KnockoutObservable<string>;
    sex: KnockoutObservable<string>;
    points: KnockoutObservable<number>;
    teamId: KnockoutObservable<number>;

    constructor(private onFinish: (competitor: Competitor) => void, private isEdit: boolean = false, private teams: Team[] = [], private model: Competitor = null) {
        this.id = isEdit ? ko.observable(model.id) : ko.observable(0);
        this.firstName = isEdit ? ko.observable(model.firstName) : ko.observable();
        this.lastName = isEdit ? ko.observable(model.lastName) : ko.observable();
        this.sex = isEdit ? ko.observable(model.sex) : ko.observable();
        this.points = isEdit ? ko.observable(model.points) : ko.observable();
        this.teamId = isEdit ? ko.observable(model.teamId) : ko.observable();
    }

    flushResult() {
        this.onFinish(new Competitor(-1, this.firstName(), this.lastName(), this.sex(), this.teamId(), this.points()))
        //this.model.firstName = this.firstName();
        //this.model.lastName = this.lastName();
        //this.model.sex = this.sex();
        //this.model.time = this.time();
        //this.model.points = this.points();
        //this.model.teamId = this.teamId();
        //this.model.competitions = this.competitions();

        //this.onFinish(this.model);
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

        this.refreshResults = function () {
            this.service.getAllCompetitors()
                .then((competitors) => {
                    competitors.forEach((competitor) => {
                        this.service.readTeam(competitor.teamId).then((team) => {
                            this.competitors.push({ competitor, teamName: team.name });
                        })
                    })
                });
        };
    }

    createNewCompetitor() {
        this.activeCompetitor(new CompetitorsDialogVM((newCompetitor: Competitor) => {
            this.service.createCompetitor(newCompetitor).then((id) => {
                this.refreshResults();
                this.activeCompetitor(null);
            });
        }, false, this.teams()));
    }

    editCompetitor(editedCompetitor: Competitor) {
        this.activeCompetitor(new CompetitorsDialogVM((updatedCompetitor: Competitor) => {
            this.service.updateCompetitor(editedCompetitor.id, editedCompetitor).then((id) => {
                this.refreshResults();
                this.activeCompetitor(null);
            });
        }, true, this.teams(), editedCompetitor));
    }
}