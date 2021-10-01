import Competitor from '../Competitor/Competitor';
import template from './PersonEditable.html';

class PersonReadOnly {
    competitors: KnockoutObservableArray<Competitor>;

    constructor(params: { competitors: Array<Competitor> }) {
        this.competitors = ko.observableArray(params.competitors);
    }
}

// The default export returns the component details object to register with KO  
export default { viewModel: PersonReadOnly, template: template };