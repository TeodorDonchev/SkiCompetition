import Competition from "../Models/Competition.js";
import Competitor from "../Models/Competitor.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export class CompetitionsDialogVM {

    name: KnockoutObservable<string>;
    location: KnockoutObservable<string>;
    date: KnockoutObservable<string>;
    competitors: KnockoutObservableArray<number>;
    competitorModels: KnockoutObservableArray<Competitor>;

    constructor(private model: Competition, private onFinish: (competition: Competition) => void, private isEdit: boolean = false, private competitorsInCompetition: Competitor[] = []) {
        if (isEdit) {
            let dateArr = model.date.split('/');
            this.model.date = dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];
        }
        this.name = this.isEdit ? ko.observable(this.model.name) : ko.observable();
        this.location = this.isEdit ? ko.observable(this.model.location) : ko.observable();
        this.date = this.isEdit ? ko.observable(this.model.date) : ko.observable();
        this.competitors = this.isEdit ? ko.observableArray(this.model.competitors) : ko.observableArray();
        this.competitorModels = this.isEdit ? ko.observableArray(this.competitorsInCompetition) : ko.observableArray();
        console.log('date: ', this.date());
    }

    flushResult() {
        this.onFinish(new Competition(-1, this.name(), this.date(), this.location()));
    }
}

export default class CompetitionsVM extends ContentVM {
    competitions: KnockoutObservableArray<Competition>;
    activeCompetition: KnockoutObservable<CompetitionsDialogVM>;
    selectedCompetition: KnockoutObservable<Competition>;
    filterBy: KnockoutObservable<number>;// 0 - all, 1 - finished, 2 - upcomming
    filteredCompetitions: KnockoutComputed<Array<Competition>>;

    constructor(service: Service) {
        super(service);
        this.filterBy = ko.observable(0);
        this.competitions = ko.observableArray([]);
        this.selectedCompetition = ko.observable();
        this.activeCompetition = ko.observable(null);

        this.filteredCompetitions = ko.computed(() => {
            let filterBy = this.filterBy();
            if (filterBy === 0)
                return this.competitions();
            else
                return this.competitions().filter((competition) => {
                    return (competition.isFinished && filterBy === 1) || (!competition.isFinished && filterBy === 2);
                });
        });
        this.refreshResults = function () {
            this.service.getAllCompetitions()
                .then((competitions) => {
                    //competitions = competitions.map((c) => {
                    //    return ({ id: c.id, name: c.name, location: c.location, date: c.date.split('-').reverse().join('/'), competitors: c.competitors, isFinished: c.isFinished });
                    //});
                    console.log(competitions);
                    this.competitions(competitions);
                });
        };
    }

    createNewCompetition() {
        this.activeCompetition(new CompetitionsDialogVM(this.service.createNewCompetition(), (newCompetition: Competition) => {
            this.service.createCompetition(newCompetition).then((id) => {
                this.refreshResults();
                this.activeCompetition(null);
            });
        }));
    }

    editCompetition(editedCompetition: Competition) {
        this.service.getCompetitorsInCompetition(editedCompetition.competitors)
            .then((competitorsInCompetition) => {
                this.activeCompetition(new CompetitionsDialogVM(editedCompetition, (updatedCompetition: Competition) => {
                    this.service.updateCompetition(updatedCompetition.id, updatedCompetition).then((id) => {
                        this.refreshResults();
                        this.activeCompetition(null);

                    });
                }, true, competitorsInCompetition));
            })

    }

    //refreshResults() {
       
    //}
}