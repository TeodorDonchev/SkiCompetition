import template from './templates/baseTemplate.html';
class AllTeams {
    constructor(params) {
        this.models = params.teams;
        this.teams = ko.observableArray(params.teams);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }
    _hasChanges() {
        return JSON.stringify(this.teams()) === JSON.stringify(this.models);
    }
}
export default { viewModel: AllTeams, template: template };
//# sourceMappingURL=AllTeams.js.map