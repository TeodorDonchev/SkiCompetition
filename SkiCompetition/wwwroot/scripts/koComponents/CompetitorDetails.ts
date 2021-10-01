import Competitor from '../Competitor/Competitor';
import template from './templates/CompetitorDetails.html';

class CompetitorDetails {
    competitor: Competitor;

    constructor(params: { person: Competitor }) {
        this.competitor = params.person;
    }
}

// The default export returns the component details object to register with KO  
export default { viewModel: CompetitorDetails, template: template };