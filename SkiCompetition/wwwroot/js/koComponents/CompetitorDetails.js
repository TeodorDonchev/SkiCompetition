import template from './templates/CompetitorDetails.html';
class CompetitorDetails {
    constructor(params) {
        this.competitor = params.person;
    }
}
// The default export returns the component details object to register with KO  
export default { viewModel: CompetitorDetails, template: template };
//# sourceMappingURL=CompetitorDetails.js.map