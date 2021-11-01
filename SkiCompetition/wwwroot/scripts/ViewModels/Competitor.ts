import Competitor from "../Models/Competitor.js";
import Team from "../Models/Team.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export class CompetitorsDialogVM {

    firstName: KnockoutObservable<string>;
    lastName: KnockoutObservable<string>;
    sex: KnockoutObservable<string>;
    time: KnockoutObservable<number>;
    points: KnockoutObservable<number>;
    teamId: KnockoutObservable<number>;
    competitions: KnockoutObservableArray<number>;

    constructor(private model: Competitor, private onFinish: (competitor: Competitor) => void, private isEdit: boolean = false, private teams: Team[] = []) {
        this.firstName = isEdit ? ko.observable(model.firstName) : ko.observable();
        this.lastName = isEdit ? ko.observable(model.lastName) : ko.observable();
        this.sex = isEdit ? ko.observable(model.sex) : ko.observable();
        this.time = isEdit ? ko.observable(model.time) : ko.observable();
        this.points = isEdit ? ko.observable(model.points) : ko.observable();
        this.teamId = isEdit ? ko.observable(model.teamId) : ko.observable();
        this.competitions = isEdit ? ko.observableArray(model.competitions) : ko.observableArray();
    }

    flushResult() {
        this.onFinish(new Competitor(-1, this.firstName(), this.lastName(), this.sex(), this.time(), this.points(), this.teamId(), this.competitions()))
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
    competitors: KnockoutObservableArray<Competitor>;
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
                    this.competitors(competitors);
                });
            this.service.getAllTeams().then((teams) => {
                this.teams = ko.observableArray(teams);
            });
        };
    }

    createNewCompetitor() {
        this.activeCompetitor(new CompetitorsDialogVM(this.service.CreateNewCompetitor(), (newCompetitor: Competitor) => {
            this.service.createCompetitor(newCompetitor).then((id) => {
                this.refreshResults();
                this.activeCompetitor(null);
            });
        }, false, this.teams()));
    }

    editCompetitor(editedCompetitor: Competitor) {
        this.activeCompetitor(new CompetitorsDialogVM(editedCompetitor, (updatedCompetitor: Competitor) => {
            this.service.updateCompetitor(editedCompetitor.id, editedCompetitor).then((id) => {
                this.refreshResults();
                this.activeCompetitor(null);
            });
        }, true, this.teams()));
    }
}