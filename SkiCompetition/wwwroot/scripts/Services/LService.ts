import Competition from "../Models/Competition.js";
import Competitor from "../Models/Competitor.js";
import Team from "../Models/Team.js";
import CompetitorCRUDCacheDecorator from "./Decorators/CompetitorCRUDCache.js";
import CompetitorCRUDLogDecorator from "./Decorators/CompetitorCRUDLog.js";
import CompetitionCrud from './CRUD/CompetitionCrud.js';
import CompetitorCrud from './CRUD/CompetitorCrud.js';
import ICompetitionService from "./Interfaces/ICompetitionService.js";
import ICompetitorService from "./Interfaces/ICompetitorService.js";
import ITeamService from "./Interfaces/ITeamSevice.js";
import ConsoleLogger from "./ConsoleLogger.js";
import CompetitionCRUDLogDecorator from "./Decorators/CompetitionCRUDLog.js";
import CompetitionCRUDCacheDecorator from "./Decorators/CompetitionCRUDCache.js";
import TeamCRUDLogDecorator from "./Decorators/TeamCRUDLog.js";
import TeamCRUDCacheDecorator from "./Decorators/TeamCRUDCache.js";
import TeamCrud from "./CRUD/TeamCrud.js";

export default class LService implements ICompetitionService, ICompetitorService, ITeamService{
    private CompetitorCRUD: ICRUD<Competitor>;
    private CompetitionCRUD: ICRUD<Competition>;
    private TeamCRUD: ICRUD<Team>;

    constructor() {
        this.CompetitorCRUD = new CompetitorCRUDLogDecorator(new CompetitorCRUDCacheDecorator(new CompetitorCrud()), new ConsoleLogger());
        this.CompetitionCRUD = new CompetitionCRUDLogDecorator(new CompetitionCRUDCacheDecorator(new CompetitionCrud()), new ConsoleLogger());
        this.TeamCRUD = new TeamCRUDLogDecorator(new TeamCRUDCacheDecorator(new TeamCrud()), new ConsoleLogger());
    }

    getSortedTeams(): Promise<Team[]> {
        return this.TeamCRUD.ReadAll().then((teams) => {
            return teams.sort((a, b) => b.points - a.points);
        });
    }

    getSortedFemaleCompetitors(): Promise<Competitor[]> {
        console.log('competitor crud: ', this.CompetitorCRUD);
        return this.CompetitorCRUD.ReadAll().then((competitors) => {
            console.log('competitors from sorted female: ', competitors);
            return competitors.filter((competitor) => competitor.sex === 'Female').sort((a, b) => b.points - a.points);
        });
    }

    getSortedMaleCompetitors(): Promise<Competitor[]> {
        return this.CompetitorCRUD.ReadAll().then((competitors) => {
            return competitors.filter((competitor) => competitor.sex === 'Male').sort((a, b) => b.points - a.points);
        });
    }

    getPastCompetitions(): Promise<Competition[]> {
        return this.CompetitionCRUD.ReadAll().then((competitions) => {
            return competitions.filter((competition) => competition.isFinished);
        });
    }

    getUpcomingCompetitions(): Promise<Competition[]> {
        return this.CompetitionCRUD.ReadAll().then((competitions) => {
            return competitions.filter((competition) => !competition.isFinished);
        });
    }

    getAllTeams(): Promise<Team[]> {
        return this.TeamCRUD.ReadAll().then((teams) => {
            return teams;
        });
    }
    createTeam(element: Team): Promise<number> {
        return this.TeamCRUD.Create(element).then((id) => {
            return id;
        });
    }
    readTeam(id: number): Promise<Team> {
        return this.TeamCRUD.Read(id).then((team) => {
            return team;
        });
    }
    updateTeam(id: number, element: Team): Promise<void> {
        return this.TeamCRUD.Update(id, element);
    }
    deleteTeam(id: number): Promise<void> {
        return this.TeamCRUD.Delete(id);
    }
    getAllCompetitors(): Promise<Competitor[]> {
        return this.CompetitorCRUD.ReadAll().then((competitors) => {
            return competitors;
        })
    }
    CreateCompetitor(element: Competitor): Promise<number> {
        return this.CompetitorCRUD.Create(element).then((id) => {
            return id;
        })
    }
    ReadCompetitor(id: number): Promise<Competitor> {
        return this.CompetitorCRUD.Read(id).then((competitor) => {
            return competitor;
        })
    }
    UpdateCompetitor(id: number, element: Competitor): Promise<void> {
        return this.CompetitorCRUD.Update(id, element);
    }
    DeleteCompetitor(id: number): Promise<void> {
        return this.CompetitorCRUD.Delete(id);
    }
    getAllCompetition(): Promise<Competition[]> {
        return this.CompetitionCRUD.ReadAll().then((competitions)=> {
            return competitions;
        });
    }
    CreateCompetition(element: Competition): Promise<number> {
        return this.CompetitionCRUD.Create(element).then((id) => {
            return id;
        });
    }
    ReadCompetition(id: number): Promise<Competition> {
        return this.CompetitionCRUD.Read(id).then((competition) => {
            return competition;
        });
    }
    UpdateCompetition(id: number, element: Competition): Promise<void> {
        return this.CompetitionCRUD.Update(id, element);
    }
    DeleteCompetition(id: number): Promise<void> {
        return this.CompetitionCRUD.Delete(id);
    }

}