import template from './templates/CompetitionDetails.html';
class CompetitionDetails {
    constructor(params) {
        this.model = params.competition;
        this.name = ko.observable(this.model.name);
        this.location = ko.observable(this.model.location);
        this.isFinished = ko.observable(this.model.isFinished);
        this.date = ko.observable(this.model.date);
        this.competitors = ko.observableArray(this.model.competitors);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }
    _hasChanges() {
        return this.name() === this.model.name &&
            this.date() === this.model.date &&
            this.location() === this.model.location &&
            this.isFinished() === this.model.isFinished &&
            JSON.stringify(this.competitors()) === JSON.stringify(this.model.competitors);
    }
}
export default { viewModel: CompetitionDetails, template: template };
//# sourceMappingURL=CompetitionDetails.js.map