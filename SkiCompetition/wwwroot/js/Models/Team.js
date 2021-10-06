class Team extends BaseModel {
    constructor(id, name) {
        super();
        this.id = id;
        this.name = name;
        this._competitors = [];
        this._points = 0;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get competitors() {
        return this._competitors;
    }
    get points() {
        return this._points;
    }
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
}
export default Team;
//# sourceMappingURL=Team.js.map