class Competition {
    constructor(name, date, location) {
        this.name = ko.observable(name);
        this.date = ko.observable(date);
        this.location = ko.observable(location);
        this.competitors = ko.observableArray([]);
    }
}
export default Competition;
//# sourceMappingURL=Competition.js.map