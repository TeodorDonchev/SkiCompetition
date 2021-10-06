import template from './templates/baseTemplate.html';
class PersonalRanks {
    constructor(params) {
        this.models = params.competitors;
        this.ranks = ko.observableArray(params.competitors);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }
    _hasChanges() {
        return JSON.stringify(this.ranks()) === JSON.stringify(this.models);
    }
}
export default { viewModel: PersonalRanks, template: template };
//# sourceMappingURL=PersonalRanks.js.map