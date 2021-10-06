import Team from "../Models/Team";
import template from './templates/baseTemplate.html';

class AllTeams {
    models: Array<Team>;
    teams: KnockoutObservableArray<Team>;
    hasChanges: KnockoutObservable<boolean>;

    constructor(params: { teams: Array<Team> }) {
        this.models = params.teams;
        this.teams = ko.observableArray(params.teams);
        this.hasChanges = ko.computed(() => this._hasChanges());
    }

    private _hasChanges(): boolean {
        return JSON.stringify(this.teams()) === JSON.stringify(this.models);
    }
}

export default { viewModel: AllTeams, template: template };