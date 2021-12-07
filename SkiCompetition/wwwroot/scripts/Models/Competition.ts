import Competitor from './Competitor.js';
import BaseModel from './BaseModel.js';

class Competition extends BaseModel {
    private _id: number;
    private _name: string;
    private _date: Date;
    private _location: string;
    private _isFinished: boolean;
    private _competitorRelations: Array<{ competitorId: number, time: number, points: number, place: number}>;

    constructor(id: number, name: string, date: Date, location: string, competitorRelations: Array<{ competitorId: number, time: number, points: number, place: number }> = [], isFinished: boolean = false) {
        super();
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
        this._competitorRelations = competitorRelations;
        this._isFinished = isFinished;
    }

    //rearange property, get, set
    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get date() {
        return this._date;
    }

    public get location() {
        return this._location;
    }

    public get isFinished() {
        return this._isFinished;
    }

    public get competitorRelations() {
        return this._competitorRelations;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    public set date(value: Date) {
        this._date = value;
    }

    public set location(value: string) {
        this._location = value;
    }

    public set competitorRelations(value: Array<{ competitorId: number, time: number, points: number, place: number }>) {
        this._competitorRelations = value;
    }

    public set isFinished(value: boolean) {
        this._isFinished = value;
    }

    getServerData() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            date: this.date,
            location: this.location,
            isFinished: this.isFinished,
            competitorRelations: this.competitorRelations
        });
    }
}

export default Competition;