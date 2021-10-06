import Competition from './Competition.js';
import Team from '../Models/Team.js';
import BaseModel from './BaseModel.js';

class Competitor extends BaseModel {
    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _sex: string;
    private _team: Team;
    private _points: number;
    private _time: Date;
    private _competitions: Array<Competition>;

    //remove points from constructor later
    constructor(id: number, firstName: string, lastName: string, sex: string, team: Team, points: number) {
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

    public get id() {
        return this._id;
    }

    public get firstName() {
        return this._firstName;
    }

    public get lastName() {
        return this._lastName;
    }

    public get sex() {
        return this._sex;
    }

    public get team() {
        return this._team;
    }

    public get points() {
        return this._points;
    }

    public get time() {
        return this._time;
    }

    public get competitions() {
        return this._competitions;
    }

    private set id(value: number) {
        this._id = value;
    }

    private set firstName(value: string) {
        this._firstName = value;
    }

    private set lastName(value: string) {
        this._lastName = value;
    }

    private set sex(value: string) {
        this._sex = value;
    }

    private set team(value: Team) {
        this._team = value;
    }

}

// The default export returns the component details object to register with KO  
export default Competitor;