import Competitor from './Competitor.js';
import BaseModel from './BaseModel.js';

class Competition extends BaseModel {
    private _id: number;
    private _name: string;
    private _date: number;
    private _location: string;
    private _isFinished: boolean;
    private _competitors: Array<number>;

    //remove competitors, isFinished from constructor later
    constructor(id: number, name: string, date: number, location: string, competitorIds: Array<number> = [], isFinished: boolean = false) {
        super();
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
        this._competitors = competitorIds;
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

    public get competitors() {
        return this._competitors;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    public set date(value: number) {
        this._date = value;
    }

    public set location(value: string) {
        this._location = value;
    }

    public addCompetitor(competitor: Competitor) {
        this._competitors.push(competitor.id);
    }

}

export default Competition;