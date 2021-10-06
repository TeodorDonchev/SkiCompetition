import Team from "../Models/Team";
import template from './templates/baseTemplate.html';

class TeamRanks {
    models: Array<Team>;
    teams: KnockoutObservableArray<Team>;
    hasChanges: KnockoutObservable<boolean>;

    constructor(params: { teams: Array<Team> }) {
        this.models = params.teams;
        this.teams = ko.observableArray(params.teams);
        this._hasChanges = ko.computed(() => this._hasChanges());
    }

    private _hasChanges(): boolean {
        return JSON.stringify(this.teams()) === JSON.stringify(this.models);
    }
}

export default { viewModel: TeamRanks, template: template };