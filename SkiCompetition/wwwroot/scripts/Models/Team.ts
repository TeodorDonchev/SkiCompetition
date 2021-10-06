import Competitor from './Competitor.js';
import BaseModel from './BaseModel.js';

class Team extends BaseModel{
    private _id: number;
    private _name: string;
    private _competitors: Array<Competitor>;
    private _points: number;

    //remove points from constructor later
    constructor(id: number, name: string, points: number) {
        super();
        this.id = id;
        this.name = name;
        this._competitors = [];
        this._points = points;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get competitors() {
        return this._competitors;
    }

    public get points() {
        return this._points;
    }

    private set id(value: number) {
        this._id = value;
    }

    private set name(value: string) {
        this._name = value;
    }
}

export default Team;