import Competitor from '../Models/Competitor';
import template from './templates/baseTemplate.html';

class PersonalRanks {
    models: Array<Competitor>;
    ranks: KnockoutObservableArray<Competitor>;
    hasChanges: KnockoutObservable<boolean>;

    constructor(params: { competitors: Array<Competitor> }) {
        this.models = params.competitors;
        this.ranks = ko.observableArray(params.competitors);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }

    private _hasChanges(): boolean {
        return JSON.stringify(this.ranks()) === JSON.stringify(this.models);
    }
}

export default { viewModel: PersonalRanks, template: template };