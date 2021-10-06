import template from './PersonEditable.html';
class AllCompetitions {
    constructor(params) {
        this.models = params.competitions;
        this.competitions = ko.observableArray(params.competitions);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }
    _hasChanges() {
        return JSON.stringify(this.competitions()) === JSON.stringify(this.models);
    }
}
// The default export returns the component details object to register with KO  
export default { viewModel: AllCompetitions, template: template };
//# sourceMappingURL=AllCompetitions.js.map