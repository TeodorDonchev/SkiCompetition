class Competitor {
    constructor(competitorID, firstName, lastName, sex, team) {
        //TODO: add all values as constructor parameters
        this.competitorID = competitorID;
        this.firstName = ko.observable(firstName);
        this.lastName = ko.observable(lastName);
        this.sex = ko.observable(sex);
        this.team = ko.observable(team);
        this.points = ko.observable(0);
        this.time = ko.observable(new Date());
        this.competitions = ko.observableArray([]);
    }
}
// The default export returns the component details object to register with KO  
export default Competitor;
//# sourceMappingURL=Competitor.js.map