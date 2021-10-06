import Competition from "./Models/Competition.js";
import Competitor from "./Models/Competitor.js";
import Team from "./Models/Team.js";

class Service {
    teams: Array<Team>;
    competitors: Array<Competitor>;
    orderedFemaleCompetitors: Array<Competitor>;
    orderedMaleCompetitors: Array<Competitor>;
    orderedTeams: Array<Team>;
    competitions: Array<Competition>;
    pastCompetitions: Array<Competition>;
    upcomingCompetitions: Array<Competition>;

    constructor() { 
        this.teams = [
            new Team(1, 'Peshevski Team', 102),
            new Team(2, 'Goshovski Team', 20),
            new Team(3, 'Petkanski Team', 23),
            new Team(4, 'Ivanovski Team', 1),
            new Team(5, 'Vasilevski Team', 140),
            new Team(6, 'Edi Kakuv si Team', 89),
            new Team(7, 'Alabala Team', 99),
            new Team(8, 'Portokala Team', 92),
            new Team(9, 'Baba Team', 23),
            new Team(10, 'Meca Team', 182),
        ];
        this.competitors = [
            new Competitor(1, 'Pesho', 'Peshev', 'Male', this.teams[0], 2),
            new Competitor(2, 'Gosho', 'Goshev', 'Male', this.teams[2], 10),
            new Competitor(3, 'Petranka', 'Vasileva', 'Female', this.teams[7], 0),
            new Competitor(4, 'Pesho', 'Peshev', 'Male', this.teams[4], 150),
            new Competitor(5, 'Gosho', 'Goshev', 'Male', this.teams[5], 25),
            new Competitor(6, 'Petranka', 'Vasileva', 'Female', this.teams[3], 78),
            new Competitor(7, 'Pesho', 'Peshev', 'Male', this.teams[1], 23),
            new Competitor(8, 'Gosho', 'Goshev', 'Male', this.teams[8], 12),
            new Competitor(9, 'Petranka', 'Vasileva', 'Female', this.teams[9], 6),
            new Competitor(10, 'Pesho', 'Peshev', 'Male', this.teams[6], 101),
        ];

        this.competitions = [
            new Competition(1, 'World Cup', new Date(), 'Bansko', this.competitors, true),
            new Competition(2, 'Borovets Cup', new Date(), 'Borovets', this.competitors,false),
            new Competition(3, 'Vitosha Cup', new Date(), 'Sofia', this.competitors,false),
            new Competition(4, 'World Cup 2020', new Date(), 'Bansko', this.competitors, false),
            new Competition(5, 'World Cup 2021', new Date(), 'Bansko', this.competitors, false),
            new Competition(6, 'World Cup 2016', new Date(), 'Sofia', this.competitors, true),
            new Competition(7, 'World Cup 2013', new Date(), 'Bansko', this.competitors, true),
            new Competition(8, 'World Cup 2012', new Date(), 'Bansko', this.competitors, true),
            new Competition(9, 'World Cup 2011', new Date(), 'Borovets', this.competitors,false),
            new Competition(10, 'World Cup 2010', new Date(), 'Bansko', this.competitors,false),
        ];

        this.orderedFemaleCompetitors = this.competitors.filter(competitor => competitor.sex === 'Female').sort((a, b) => b.points - a.points);
        this.orderedMaleCompetitors = this.competitors.filter(competitor => competitor.sex === 'Male').sort((a, b) => b.points - a.points);
        this.pastCompetitions = this.competitions.filter(competition => competition.isFinished);
        this.upcomingCompetitions = this.competitions.filter(competition => !competition.isFinished);
        this.orderedTeams = [...this.teams].sort((a, b) => b.points - a.points);

    }

}

export default Service;