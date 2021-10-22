import Competition from "../Models/Competition.js";
import LService from "../Services/LService.js";
import ContentVM from "./Content.js";

export class CompetitionsDialogVM {

    name: KnockoutObservable<string>;
    location: KnockoutObservable<string>;
    date: KnockoutObservable<number>;

    constructor(private model: Competition, private onFinish: (competition: Competition) => void, private isEdit: boolean = false) {
        this.name = ko.observable(model.name);
        this.location = ko.observable(model.location);
        this.date = ko.observable(model.date);
    }

    flushResult() {
        this.onFinish(new Competition(-1, this.name(), this.date(), this.location()));
    }
}

export default class CompetitionsVM extends ContentVM {
    competitions: KnockoutObservableArray<Competition>;
    activeCompetition: KnockoutObservable<CompetitionsDialogVM>;
    selectedCompetition: KnockoutObservable<Competition>;


    constructor(service: LService) {
        super(service);
        this.competitions = ko.observableArray([]);
        this.selectedCompetition = ko.observable();
        this.activeCompetition = ko.observable(null);
        this.refreshResults();
    }

    createNewCompetition() {
        this.activeCompetition(new CompetitionsDialogVM(this.service.createNewCompetition(), (newCompetition: Competition) => {
            this.service.CreateCompetition(newCompetition).then((id) => {
                //this.refreshResults();
                this.competitions.push(newCompetition);
                this.activeCompetition(null);
            });
        }));
    }

    editCompetition(editedCompetition: Competition) {
        this.activeCompetition(new CompetitionsDialogVM(editedCompetition, (updatedCompetition: Competition) => {
            this.service.UpdateCompetition(editedCompetition.id, editedCompetition).then((id) => {
                //this.refreshResults();
                this.competitions.replace(editedCompetition, updatedCompetition);
                this.activeCompetition(null);

            });
        }, true));
    }

    refreshResults() {
        this.service.getAllCompetition()
            .then((competitions) => {
                this.competitions(competitions);
            });
    }
}