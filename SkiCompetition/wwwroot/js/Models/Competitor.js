import BaseModel from './BaseModel.js';
class Competitor extends BaseModel {
    //remove points from constructor later
    constructor(id, firstName, lastName, sex, team, points) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sex = sex;
        this.team = team;
        this._points = points;
        this._time = new Date();
        this._competitions = [];
    }
    get id() {
        return this._id;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get sex() {
        return this._sex;
    }
    get team() {
        return this._team;
    }
    get points() {
        return this._points;
    }
    get time() {
        return this._time;
    }
    get competitions() {
        return this._competitions;
    }
    set id(value) {
        this._id = value;
    }
    set firstName(value) {
        this._firstName = value;
    }
    set lastName(value) {
        this._lastName = value;
    }
    set sex(value) {
        this._sex = value;
    }
    set team(value) {
        this._team = value;
    }
}
// The default export returns the component details object to register with KO  
export default Competitor;
//# sourceMappingURL=Competitor.js.map