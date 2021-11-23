import Competition from "../Models/Competition.js";
import Competitor from "../Models/Competitor.js";
import Service from "../Services/Service.js";
import ContentVM from "./Content.js";
import IDialog from "./IDialog.js";

const defaultCompetition = new Competition(0, '', new Date(Date.now()), '', [])


export class CompleteCompetitionDialogVM implements IDialog {
    competitors: KnockoutObservableArray<{ competitor: Competitor, time: number }>;
    status: KnockoutObservable<string>;

    constructor(private onFinish: (competition) => void, competitors: Array<{ competitor: Competitor, time: number }>, status: string) {
        this.competitors = ko.observableArray(competitors);
        this.status = ko.observable(status);
    }
    flushResult(): void {
        
    }
}

export class CompetitionsDialogVM implements IDialog {
    id: KnockoutObservable<number>;
    name: KnockoutObservable<string>;
    location: KnockoutObservable<string>;
    date: KnockoutObservable<Date>;
    isFinished: KnockoutObservable<boolean>;
    competitorRelations: KnockoutObservableArray<{ competitorId: number, time: number, points: number, place: number }>;
    competitorsInCompetition: KnockoutObservableArray<Competitor>;
    competitorsOutOfCompetition: KnockoutObservableArray<Competitor>;
    addedCompetitorId: KnockoutObservable<number>;
    status: KnockoutObservable<string>;

    constructor(private onFinish: (competition: Competition) => void, private service: Service, status: string, private model: Competition = defaultCompetition) {

        this.id = ko.observable(this.model.id);
        this.name = ko.observable(this.model.name);
        this.location = ko.observable(this.model.location);
        this.date = ko.observable(new Date(this.model.date));
        this.competitorRelations = ko.observableArray([...this.model.competitorRelations]);
        this.isFinished = ko.observable(this.model.isFinished);
        this.competitorsInCompetition = ko.observableArray();
        this.competitorsOutOfCompetition = ko.observableArray();
        this.addedCompetitorId = ko.observable();
        this.status = ko.observable(status);
        this.refresh();
    }

    isCreate() {
        return (this.model != defaultCompetition);
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
        this.competitorRelations.push({ competitorId: this.addedCompetitorId(), time: 0, points: 0, place: 0 });
        this.service.readCompetitor(this.addedCompetitorId()).then((competitor) => {
            this.competitorsInCompetition.push(competitor);
            let found = this.competitorsOutOfCompetition().find((c) => c.id === competitor.id);
            this.competitorsOutOfCompetition.remove(found);
        });
    }

    removeCompetitor(competitor: Competitor) {
        let found = this.competitorRelations().find((r) => r.competitorId == competitor.id);
        this.competitorRelations.remove(found);
        this.competitorsOutOfCompetition.push(competitor);
        this.competitorsInCompetition.remove(competitor);
    }

    flushResult() {
        this.onFinish(new Competition(this.id(), this.name(), this.date(), this.location(), this.competitorRelations(), this.isFinished()));
    }
}

export default class CompetitionsVM extends ContentVM {
    competitions: KnockoutObservableArray<Competition>;
    activeCompetition: KnockoutObservable<IDialog>;
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
    }

    createNewCompetition() {
        this.activeCompetition(new CompetitionsDialogVM((newCompetition: Competition) => {
            this.service.createCompetition(newCompetition).then((id) => {
                this.refreshResults();
                this.activeCompetition(null);
            });
        }, this.service, 'Create'));
    }

    editCompetition(competition: Competition) {
        this.activeCompetition(new CompetitionsDialogVM((updatedCompetition: Competition) => {
            this.service.updateCompetition(updatedCompetition.id, updatedCompetition).then((id) => {
                this.refreshResults();
                this.activeCompetition(null);
            });
        }, this.service, 'Edit', competition));

    }

    getCompetitorsInCompetition(competition: Competition): Promise<{ competitor: Competitor, time: number }[]> {
        return new Promise((resolve, reject) => {
            let results = [];
            this.service.getAllCompetitors().then((competitors) => {
                competition.competitorRelations.forEach((relation) => {
                    let competitor = competitors.find(c => c.id === relation.competitorId);
                    results.push({ competitor: competitor, time: 0 });
                })
                resolve(results);
            });
        });
    }

    completeCompetition(competition: Competition) {
        competition.isFinished = true;
        this.getCompetitorsInCompetition(competition).then((results) => {

            this.activeCompetition(new CompleteCompetitionDialogVM((updatedCompetition: Competition) => {
                this.service.updateCompetition(updatedCompetition.id, updatedCompetition).then((id) => {
                    this.refreshResults();
                    this.activeCompetition(null);
                });
            }, results, 'Complete'))

        })
    }

    deleteCompetition(id: number) {
        if (!id) {
            return;
        }
        this.service.deleteCompetition(id).then(data => this.refreshResults());
    }


    refreshResults() {
        this.service.getAllCompetitions()
            .then((competitions) => {
                competitions = competitions.map((c) => {
                    return (new Competition(c.id, c.name, c.date, c.location, c.competitorRelations, c.isFinished));
                });
                console.log(competitions);
                this.competitions(competitions);
            });
    };
}