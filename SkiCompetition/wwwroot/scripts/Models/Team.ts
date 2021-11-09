import BaseModel from './BaseModel.js';

class Team extends BaseModel {
    private _id: number;
    private _name: string;
    private _competitors: Array<number>;
    private _points: number;

    constructor(id: number, name: string, points: number = 0, competitors: Array<number> = []) {
        super();
        this.id = id;
        this.name = name;
        this._points = points;
        this._competitors = competitors;
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

    public set id(value: number) {
        this._id = value;
    }

    public set name(value: string) {
        this._name = value;
    }

    public set competitors(value: number[]) {
        this._competitors = value;
    }

    public set points(value: number) {
        this._points = value;
    }
    getServerData() {
        return JSON.stringify({
            //id: this.id,
            name: this.name,
            points: this.points
        });
    }
}

export default Team;