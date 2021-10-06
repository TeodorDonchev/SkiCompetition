import template from './templates/baseTemplate.html';
class TeamRanks {
    constructor(params) {
        this.models = params.teams;
        this.teams = ko.observableArray(params.teams);
        this._hasChanges = ko.computed(() => this._hasChanges());
    }
    _hasChanges() {
        return JSON.stringify(this.teams()) === JSON.stringify(this.models);
    }
}
export default { viewModel: TeamRanks, template: template };
//# sourceMappingURL=TeamRanks.js.map