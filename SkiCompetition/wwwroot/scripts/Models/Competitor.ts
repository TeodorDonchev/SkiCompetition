import Competition from './Competition.js';
import Team from '../Models/Team.js';
import BaseModel from './BaseModel.js';

class Competitor extends BaseModel {

    constructor(private _id: number,
        private _firstName: string,
        private _lastName: string,
        private _sex: string,
        private _teamId: number,
        private _points: number) {
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

    private set id(value: number) {
        this._id = value;
    }

    public set firstName(value: string) {
        this._firstName = value;
    }

    public set lastName(value: string) {
        this._lastName = value;
    }

    public set sex(value: string) {
        this._sex = value;
    }

    public set teamId(value: number) {
        this._teamId = value;
    }

    public set points(value: number) {
        this._points = value;
    }
    getServerData() {
        return JSON.stringify({
            //id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            sex: this.sex,
            teamId: this.teamId,
            points: this._points
        });
    }
}

export default Competitor;