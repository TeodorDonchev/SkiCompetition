import Competitor from "../Models/Competitor.js";
import LService from "../Services/LService.js";
import ContentVM from "./Content.js";

export class CompetitorsDialogVM {

    firstName: KnockoutObservable<string>;
    lastName: KnockoutObservable<string>;
    sex: KnockoutObservable<string>;
    time: KnockoutObservable<number>;
    points: KnockoutObservable<number>;
    teamId: KnockoutObservable<number>;
    competitions: KnockoutObservableArray<number>;

    constructor(private model: Competitor, private onFinish: (competitor: Competitor) => void, private isEdit: boolean = false) {
        this.firstName = ko.observable(model.firstName);
        this.lastName = ko.observable(model.lastName);
        this.sex = ko.observable(model.sex);
        this.time = ko.observable(model.time);
        this.points = ko.observable(model.points);
        this.teamId = ko.observable(model.teamId);
        this.competitions = ko.observableArray(model.competitions);
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
    activeCompetitor: KnockoutObservable<CompetitorsDialogVM>;
    selectedCompetitor: KnockoutObservable<Competitor>;

    constructor(service: LService) {
        super(service);
        this.competitors = ko.observableArray([]);
        this.activeCompetitor = ko.observable(null);
        this.selectedCompetitor = ko.observable();
        this.refreshResults();
    }

    createNewCompetitor() {
        this.activeCompetitor(new CompetitorsDialogVM(this.service.CreateNewCompetitor(), (newCompetitor: Competitor) => {
            this.service.CreateCompetitor(newCompetitor).then((id) => {
                //this.refreshResults();
                this.competitors.push(newCompetitor);
                this.activeCompetitor(null);
            });
        }));
    }

    editCompetitor(editedCompetitor: Competitor) {
        this.activeCompetitor(new CompetitorsDialogVM(editedCompetitor, (updatedCompetitor: Competitor) => {
            this.service.UpdateCompetitor(editedCompetitor.id, editedCompetitor).then((id) => {
                //this.refreshResults();
                this.competitors.replace(editedCompetitor, updatedCompetitor);
                this.activeCompetitor(null);
            });
        }, true));
    }

    refreshResults() {
        this.service.getAllCompetitors()
            .then((competitors) => {
                this.competitors(competitors);
            });
    }
}