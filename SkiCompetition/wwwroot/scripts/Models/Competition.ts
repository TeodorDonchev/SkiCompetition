import Competitor from './Competitor.js';
import BaseModel from './BaseModel.js';

class Competition extends BaseModel {
    private _id: number;
    private _name: string;
    private _date: string;
    private _location: string;
    private _isFinished: boolean;
    private _competitorRelations: Array<{competitionId: number, competitorId: number}>;

    constructor(id: number, name: string, date: string, location: string, competitorRelations: Array<{ competitionId: number, competitorId: number }> = [], isFinished: boolean = false) {
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

    public set date(value: string) {
        this._date = value;
    }

    public set location(value: string) {
        this._location = value;
    }

    public addCompetitor(competitorRelation: { competitionId: number, competitorId: number }) {
        this._competitorRelations.push(competitorRelation);
    }

    getServerData() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            date: this.date,
            location: this.location,
            isFinished: this.isFinished,
            competitionCompetitorRelations: this.competitorRelations
        });
    }
}

export default Competition;