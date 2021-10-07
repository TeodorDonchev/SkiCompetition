import Competition from "./Models/Competition.js";
import Competitor from "./Models/Competitor.js";
import Team from "./Models/Team.js";
class Service {
    constructor() {
        this._teams = [
            new Team(1, 'Peshevski Team', 102),
            new Team(2, 'Goshovski Team', 20),
            new Team(3, 'Petkanski Team', 23),
        ];
        this._competitors = [
            new Competitor(1, 'Pesho', 'Peshev', 'Male', this._teams[0], 2),
            new Competitor(2, 'Gosho', 'Goshev', 'Male', this._teams[2], 10),
            new Competitor(3, 'Petranka', 'Vasileva', 'Female', this._teams[1], 0)
        ];
        this._competitions = [
            new Competition(1, 'World Cup', new Date(), 'Bansko', this._competitors, true),
            new Competition(2, 'Borovets Cup', new Date(), 'Borovets', this._competitors, false),
        ];
    }
    getAllCompetitions() {
        return this._competitions;
    }
    getPastCompetitions() {
        this._pastCompetitions = this._competitions.filter(competition => competition.isFinished);
        return this._pastCompetitions;
    }
    getUpcomingCompetitions() {
        this._upcomingCompetitions = this._competitions.filter(competition => !competition.isFinished);
        return this._upcomingCompetitions;
    }
    getAllTeams() {
        return this._teams;
    }
    getSortedTeams() {
        this._sortedTeams = [...this._teams].sort((a, b) => b.points - a.points);
        return this._sortedTeams;
    }
    getAllCompetitors() {
        return this._competitors;
    }
    getSortedFemaleCompetitors() {
        this._sortedFemaleCompetitors = this._competitors.filter(competitor => competitor.sex === 'Female').sort((a, b) => b.points - a.points);
        return this._sortedFemaleCompetitors;
    }
    getSortedMaleCompetitors() {
        this._sortedMaleCompetitors = this._competitors.filter(competitor => competitor.sex === 'Male').sort((a, b) => b.points - a.points);
        return this._sortedMaleCompetitors;
    }
    addCompetition(competition) {
        this._competitions.push(competition);
    }
}
export default Service;
//# sourceMappingURL=Service.js.map