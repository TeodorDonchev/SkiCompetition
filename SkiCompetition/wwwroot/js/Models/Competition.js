class Competition extends BaseModel {
    //remove competitors from constructor later
    constructor(id, name, date, location, competitors) {
        super();
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
        this._competitors = competitors;
        this._isFinished = false;
    }
    //rearange property, get, set
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get date() {
        return this._date;
    }
    get location() {
        return this._location;
    }
    get isFinished() {
        return this._isFinished;
    }
    get competitors() {
        return this._competitors;
    }
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set date(value) {
        this._date = value;
    }
    set location(value) {
        this._location = value;
    }
    addCompetitor(competitor) {
        this._competitors.push(competitor);
    }
}
export default Competition;
//# sourceMappingURL=Competition.js.map