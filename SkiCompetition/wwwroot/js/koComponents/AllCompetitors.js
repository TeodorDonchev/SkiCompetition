import template from './PersonEditable.html';
class PersonReadOnly {
    constructor(params) {
        this.competitors = ko.observableArray(params.competitors);
    }
}
// The default export returns the component details object to register with KO  
export default { viewModel: PersonReadOnly, template: template };
//# sourceMappingURL=AllCompetitors.js.map