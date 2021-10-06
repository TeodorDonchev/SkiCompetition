import template from './PersonEditable.html';
class AllCompetitors {
    constructor(params) {
        this.models = params.competitors;
        this.competitors = ko.observableArray(params.competitors);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }
    _hasChanges() {
        return JSON.stringify(this.competitors()) === JSON.stringify(this.models);
    }
}
// The default export returns the component details object to register with KO  
export default { viewModel: AllCompetitors, template: template };
//# sourceMappingURL=AllCompetitors.js.map