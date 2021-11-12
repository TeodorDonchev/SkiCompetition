import Competition from "../Models/Competition.js";
import Competitor from "../Models/Competitor.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";

export class CompetitionsDialogVM {
    id: KnockoutObservable<number>;
    name: KnockoutObservable<string>;
    location: KnockoutObservable<string>;
    date: KnockoutObservable<string>;
    competitorRelations: KnockoutObservableArray<{ competitionId: number, competitorId: number}>;
    newRelations: KnockoutObservableArray<{ competitionId: number, competitorId: number}>;
    competitorsInCompetition: KnockoutObservableArray<Competitor>;
    competitorsOutOfCompetition: KnockoutObservableArray<Competitor>;
    addedCompetitorId: KnockoutObservable<number>;

    constructor(private onFinish: (competition: Competition) => void, private isEdit: boolean = false, private model: Competition = null,
        private service: Service = null, private refreshResults: () => void = null) {
        //if (isEdit) {
        //    let dateArr = model.date.split('/');
        //    this.model.date = dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];
        //}
        this.id = this.isEdit ? ko.observable(this.model.id) : ko.observable();
        this.name = this.isEdit ? ko.observable(this.model.name) : ko.observable();
        this.location = this.isEdit ? ko.observable(this.model.location) : ko.observable();
        this.date = this.isEdit ? ko.observable(this.model.date) : ko.observable();
        this.competitorRelations = this.isEdit ? ko.observableArray(this.model.competitorRelations) : ko.observableArray();
        this.newRelations = ko.observableArray();
        this.competitorsInCompetition = ko.observableArray();
        this.competitorsOutOfCompetition = ko.observableArray();
        this.addedCompetitorId = ko.observable();
        if (isEdit) {
            this.refresh();
        }
        console.log('out', this.competitorsOutOfCompetition())
        console.log('in', this.competitorsInCompetition())
        console.log('date: ', this.date());
    }

    refresh() {
        this.service.getAllCompetitors().then((competitors) => {
            competitors.forEach((competitor) => {
                let index = this.competitorRelations().findIndex((c) => c.competitorId === competitor.id);
                if (index !== -1) {
                    this.competitorsInCompetition.push(competitor);
                } else {
                    this.competitorsOutOfCompetition.push(competitor);
                }
            });
        })
    }

    addCompetitorToCompetition() {
        if (!this.addedCompetitorId()) {
            return;
        }
        this.newRelations.push({ competitionId: this.id(), competitorId: this.addedCompetitorId()});
        this.service.readCompetitor(this.addedCompetitorId()).then((competitor) => {
            this.competitorsInCompetition.push(competitor);
            let found = this.competitorsOutOfCompetition().find((c) => c.id === competitor.id);
            this.competitorsOutOfCompetition.remove(found);
        });
    }

    removeCompetitor(competitor: Competitor) {
        console.log('competitor', competitor);
        let found = this.newRelations().find((r) => r.competitorId === competitor.id);
        console.log('new relations', this.newRelations());
        console.log('found', found);
        this.newRelations.remove(found);
        this.competitorsOutOfCompetition.push(competitor);
        this.competitorsInCompetition.remove(competitor);
    }

    deleteCompetition(id: number) {
        if (!id) {
            return;
        }
        this.service.deleteCompetition(id).then( data => this.refreshResults());
        console.log('id', id);
    }

    flushResult() {
        this.onFinish(new Competition(this.id(), this.name(), this.date(), this.location(), this.newRelations()));
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
                    competitions = competitions.map((c) => {
                        return ({ id: c.id, name: c.name, location: c.location, date: c.date.split('T')[0], competitorRelations: c.competitorRelations, isFinished: c.isFinished });
                    });
                    console.log(competitions);
                    this.competitions(competitions);
                });
        };
    }

    createNewCompetition() {
        this.activeCompetition(new CompetitionsDialogVM((newCompetition: Competition) => {
            this.service.createCompetition(newCompetition).then((id) => {
                this.refreshResults();
                this.activeCompetition(null);
            });
        }));
    }

    editCompetition(editedCompetition: Competition) {
        this.activeCompetition(new CompetitionsDialogVM((updatedCompetition: Competition) => {
            this.service.updateCompetition(updatedCompetition.id, updatedCompetition).then((id) => {
                this.refreshResults();
                this.activeCompetition(null);
            });
        }, true, editedCompetition, this.service, () => { this.refreshResults()}));

    }

    //refreshResults() {

    //}
}