import Competition from '../Models/Competition';
import Competitor from '../Models/Competitor';
import template from './templates/CompetitionDetails.html';

class CompetitionDetails {
    model: Competition;
    name: KnockoutObservable<string>;
    date: KnockoutObservable<Date>;
    location: KnockoutObservable<string>;
    isFinished: KnockoutObservable<boolean>;
    competitors: KnockoutObservableArray<Competitor>;
    hasChanges: KnockoutObservable<boolean>;

    constructor(params: { competition: Competition }) {
        this.model = params.competition;

        this.name = ko.observable(this.model.name);
        this.location = ko.observable(this.model.location);
        this.isFinished = ko.observable(this.model.isFinished);
        this.date = ko.observable(this.model.date);
        this.competitors = ko.observableArray(this.model.competitors);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }

    private _hasChanges(): boolean {
        return this.name() === this.model.name &&
            this.date() === this.model.date &&
            this.location() === this.model.location &&
            this.isFinished() === this.model.isFinished &&
            JSON.stringify(this.competitors()) === JSON.stringify(this.model.competitors);
    }
}

export default { viewModel: CompetitionDetails, template: template };