import template from './templates/baseTemplate.html';
class TeamDetails {
    constructor(params) {
        this.model = params.team;
        this.name = ko.observable(this.model.name);
        this.competitors = ko.observableArray(this.model.competitors);
        this.points = ko.observable(this.model.points);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }
    _hasChanges() {
        return this.name() === this.model.name &&
            JSON.stringify(this.competitors()) === JSON.stringify(this.model.competitors) &&
            this.points() === this.model.points;
    }
}
export default { viewModel: TeamDetails, template: template };
//# sourceMappingURL=TeamDetails.js.map