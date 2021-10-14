import Competition from './Competition.js';
import Team from '../Models/Team.js';
import BaseModel from './BaseModel.js';

class Competitor extends BaseModel {

    constructor(private _id: number,
        private _firstName: string,
        private _lastName: string,
        private _sex: string,
        private _teamId: number,
        private _points: number,
        private _time: number,
        private _competitionIds: Array<number> = []) {
        super();
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

    public get teamId() {
        return this._teamId;
    }

    public get points() {
        return this._points;
    }

    public get time() {
        return this._time;
    }

    public get competitionIds() {
        return this._competitionIds;
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

    private set teamId(value: number) {
        this._teamId = value;
    }

}

// The default export returns the component details object to register with KO  
export default Competitor;