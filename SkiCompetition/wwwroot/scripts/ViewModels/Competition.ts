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
    filterBy: KnockoutObservable<number>;//0 - all, 1 - finished,2 - upcomming
    filteredCompetitions: KnockoutComputed<Array<Competition>>;

    constructor(service: LService) {
        super(service);
        this.filterBy = ko.observable(0);
        this.competitions = ko.observableArray([]);
        this.selectedCompetition = ko.observable();
        this.activeCompetition = ko.observable(null);

        this.filteredCompetitions = ko.computed(() => {
            var filterBy = this.filterBy();
            if (filterBy === 0)
                return this.competitions();
            else
               return this.competitions().filter((competition) => {
                    return (competition.isFinished && filterBy === 1) || (!competition.isFinished && filterBy === 2);
                });
        });
        this.refreshResults();
    }

    createNewCompetition() {
        this.activeCompetition(new CompetitionsDialogVM(this.service.createNewCompetition(), (newCompetition: Competition) => {
            this.service.CreateCompetition(newCompetition).then((id) => {
                this.refreshResults();
                this.activeCompetition(null);
            });
        }));
    }

    editCompetition(editedCompetition: Competition) {
        this.activeCompetition(new CompetitionsDialogVM(editedCompetition, (updatedCompetition: Competition) => {
            this.service.UpdateCompetition(editedCompetition.id, editedCompetition).then((id) => {
                this.refreshResults();
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