import Competitor from '../Models/Competitor';
import Team from '../Models/Team';
import template from './templates/CompetitorDetails.html';

class CompetitorDetails {
    model: Competitor;
    firstName: KnockoutObservable<string>;
    lastName: KnockoutObservable<string>;
    points: KnockoutObservable<number>;
    sex: KnockoutObservable<string>;
    team: KnockoutObservable<Team>;
    time: KnockoutObservable<Date>;
    hasChanges: KnockoutComputed<boolean>;

    constructor(params: { competitor: Competitor }) {
        this.model = params.competitor;
        this.firstName = ko.observable(this.model.firstName);
        this.lastName = ko.observable(this.model.lastName);
        this.points = ko.observable(this.model.points);
        this.sex = ko.observable(this.model.sex);
        this.team = ko.observable(this.model.team);
        this.time = ko.observable(this.model.time);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }

    private _hasChanges(): boolean {
        return this.firstName() === this.model.firstName &&
            this.lastName() === this.model.lastName &&
            this.points() === this.model.points &&
            this.sex() === this.model.sex &&
            JSON.stringify(this.team()) === JSON.stringify(this.model.team) &&
            this.time() === this.model.time;

    }
}

// The default export returns the component details object to register with KO  
export default { viewModel: CompetitorDetails, template: template };