import template from './templates/baseTemplate.html';
class PersonalRank {
    constructor(params) {
        this.rank = ko.observable(params.rank);
    }
}
export default { viewModel: PersonalRank, template: template };
//# sourceMappingURL=PersonalRank.js.map