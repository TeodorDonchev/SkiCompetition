import Competition from "../Models/Competition.js";
import LService from "../Services/LService.js";
import ContentVM from "./Content.js";

export class CompetitionsDialogVM {

    name: KnockoutObservable<string>;
    location: KnockoutObservable<string>;
    date: KnockoutObservable<number>;

    constructor(private model: Competition, private onFinish: (competition: Competition) => void) {
        this.name = ko.observable(model.name);
        this.location = ko.observable(model.location);
        this.date = ko.observable(model.date);
    }

    flushResult() {
        this.model.name = this.name();
        this.model.location = this.location();
        this.model.date = this.date();
        this.onFinish(this.model);
    }
}

export default class CompetitionsVM extends ContentVM {
    competitions: KnockoutObservableArray<Competition>;
    activeCompetition: KnockoutObservable<Competition>;
    selectedCompetition: KnockoutObservable<Competition>;


    constructor(service: LService) {
        super(service);
        this.competitions = ko.observableArray([]);
        this.selectedCompetition = ko.observable();
        this.activeCompetition = ko.observable(null);
        service.getAllCompetition()
            .then((competitions) => {
                this.competitions(competitions);
            });
    }

    createNewCompetition() {
        let dialog = new CompetitionsDialogVM(this.service.createNewCompetition(), (newCompetition: Competition) => {
            this.service.CreateCompetition(newCompetition).then((id) => {
                this.competitions.push(newCompetition);
                this.activeCompetition(null);
            });
        });
        return dialog;
    }

    editCompetition(editedCompetition: Competition) {
        return new CompetitionsDialogVM(editedCompetition, (updatedCompetition: Competition) => { });
    }
}