import Competitor from '../Models/Competitor';
import template from './PersonEditable.html';

class AllCompetitors {
    models: Array<Competitor>;
    competitors: KnockoutObservableArray<Competitor>;
    hasChanges: KnockoutObservable<boolean>;

    constructor(params: { competitors: Array<Competitor> }) {
        this.models = params.competitors;
        this.competitors = ko.observableArray(params.competitors);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }

    private _hasChanges(): boolean {
        return JSON.stringify(this.competitors()) === JSON.stringify(this.models);
    }
}

// The default export returns the component details object to register with KO  
export default { viewModel: AllCompetitors, template: template };