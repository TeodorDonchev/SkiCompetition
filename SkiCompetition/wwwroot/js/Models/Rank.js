class Rank {
    constructor(competitors, teams) {
        this.competitors = competitors;
        this.teams = teams;
    }
    get competitors() {
        return this._competitors;
    }
    get teams() {
        return this._teams;
    }
    set competitors(value) {
        this._competitors = value;
    }
    set teams(value) {
        this._teams = value;
    }
}
export default Rank;
//# sourceMappingURL=Rank.js.map