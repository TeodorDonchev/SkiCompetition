import Competition from "../Models/Competition.js";
import Competitor from "../Models/Competitor.js";
import Team from "../Models/Team.js";
import CompetitorCRUDCacheDecorator from "./Competitors/CRUDCache.js";
import CompetitorCRUDLogDecorator from "./Competitors/CRUDLog.js";
import CompetitionCrud from './Competitions/Crud.js';
import CompetitorCrud from './Competitors/CRUD.js';
import ICompetitionService from "./Interfaces/ICompetitionService.js";
import ICompetitorService from "./Interfaces/ICompetitorService.js";
import ITeamService from "./Interfaces/ITeamSevice.js";
import ConsoleLogger from "./ConsoleLogger.js";
import CompetitionCRUDLogDecorator from "./Competitions/CRUDLog.js";
import CompetitionCRUDCacheDecorator from "./Competitions/CRUDCache.js";
import TeamCRUDLogDecorator from "./Teams/CRUDLog.js";
import TeamCRUDCacheDecorator from "./Teams/CRUDCache.js";
import TeamCrud from "./Teams/CRUD.js";
import CommunicationFacade from './CommunicationFacade.js';

export default class Service implements ICompetitionService, ICompetitorService, ITeamService {
    private CompetitorCRUD: ICRUD<Competitor>;
    private CompetitionCRUD: ICRUD<Competition>;
    private TeamCRUD: ICRUD<Team>;

    constructor(private loading: KnockoutObservable<boolean>) {
        //loading decorator for cruds
        this.CompetitorCRUD = new CompetitorCRUDLogDecorator(new CompetitorCrud(new CommunicationFacade<Competitor>('competitor')), new ConsoleLogger());
        this.CompetitionCRUD = new CompetitionCRUDLogDecorator(new CompetitionCrud(new CommunicationFacade<Competition>('competition')), new ConsoleLogger());
        this.TeamCRUD = new TeamCRUDLogDecorator(new TeamCrud(new CommunicationFacade<Team>('team')), new ConsoleLogger());
    }


    getSortedTeams(): Promise<Team[]> {
        return this.TeamCRUD.readAll().then((teams) => {
            return teams.sort((a, b) => b.points - a.points);
        });
    }

    getAllTeams(): Promise<Team[]> {
        this.loading(true);
        return this.TeamCRUD.readAll().then((teams) => {
            this.loading(false);
            return teams;
        });
    }
    createTeam(element: Team): Promise<number> {
        this.loading(true);
        return this.TeamCRUD.create(element).then((id) => {
            this.loading(false);
            return id;
        });
    }
    readTeam(id: number): Promise<Team> {
        this.loading(true);
        return this.TeamCRUD.read(id).then((team) => {
            this.loading(false);
            return team;
        });
    }
    updateTeam(id: number, element: Team): Promise<void> {
        this.loading(true);
        return this.TeamCRUD.update(id, element).then(() => this.loading(false));
    }
    deleteTeam(id: number): Promise<void> {
        this.loading(true);
        return this.TeamCRUD.delete(id).then(() => this.loading(false));
    }
    getAllCompetitors(): Promise<Competitor[]> {
        this.loading(true);
        return this.CompetitorCRUD.readAll().then((competitors) => {
            this.loading(false);
            return competitors;
        })
    }
    createCompetitor(element: Competitor): Promise<number> {
        this.loading(true);
        return this.CompetitorCRUD.create(element).then((id) => {
            this.loading(false);
            return id;
        })
    }
    readCompetitor(id: number): Promise<Competitor> {
        this.loading(true);
        return this.CompetitorCRUD.read(id).then((competitor) => {
            this.loading(false);
            return competitor;
        })
    }
    updateCompetitor(id: number, element: Competitor): Promise<void> {
        this.loading(true);
        return this.CompetitorCRUD.update(id, element).then(() => this.loading(false));
    }
    deleteCompetitor(id: number): Promise<void> {
        this.loading(true);
        return this.CompetitorCRUD.delete(id).then(() => this.loading(false));
    }
    getAllCompetitions(): Promise<Competition[]> {
        this.loading(true);
        return this.CompetitionCRUD.readAll().then((competitions) => {
            this.loading(false);
            return competitions;
        });
    }
    createCompetition(element: Competition): Promise<number> {
        this.loading(true);
        return this.CompetitionCRUD.create(element).then((id) => {
            this.loading(false);
            return id;
        });
    }
    readCompetition(id: number): Promise<Competition> {
        this.loading(true);
        return this.CompetitionCRUD.read(id).then((competition) => {
            this.loading(false);
            return competition;
        });
    }
    updateCompetition(id: number, element: Competition): Promise<void> {
        this.loading(true);
        return this.CompetitionCRUD.update(id, element).then(() => this.loading(false));
    }
    deleteCompetition(id: number): Promise<void> {
        this.loading(true);
        return this.CompetitionCRUD.delete(id).then(() => this.loading(false));
    }
}