import template from './templates/baseTemplate.html';
class TeamRank {
    constructor(params) {
        this.rank = ko.observable(params.rank);
    }
}
export default { viewModel: TeamRank, template: template };
//# sourceMappingURL=TeamRank.js.map