import Competitor from '../Models/Competitor';
import Team from '../Models/Team';
import template from './templates/baseTemplate.html';

class TeamDetails {
    model: Team;
    name: KnockoutObservable<string>;
    competitors: KnockoutObservableArray<Competitor>;
    points: KnockoutObservable<number>;
    hasChanges: KnockoutObservable<boolean>;

    constructor(params: { team: Team }) {
        this.model = params.team;

        this.name = ko.observable(this.model.name);
        this.competitors = ko.observableArray(this.model.competitors);
        this.points = ko.observable(this.model.points);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }

    private _hasChanges(): boolean {
        return this.name() === this.model.name &&
            JSON.stringify(this.competitors()) === JSON.stringify(this.model.competitors) &&
            this.points() === this.model.points;
    }

}


export default { viewModel: TeamDetails, template: template };