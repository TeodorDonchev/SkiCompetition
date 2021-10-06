import Competition from '../Models/Competition';
import template from './PersonEditable.html';

class AllCompetitions {
    models: Array<Competition>;
    competitions: KnockoutObservableArray<Competition>;
    hasChanges: KnockoutObservable<boolean>;

    constructor(params: { competitions: Array<Competition> }) {
        this.models = params.competitions;
        this.competitions = ko.observableArray(params.competitions);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }

    private _hasChanges(): boolean {
        return JSON.stringify(this.competitions()) === JSON.stringify(this.models);
    }
}

// The default export returns the component details object to register with KO  
export default { viewModel: AllCompetitions, template: template };