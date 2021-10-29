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
    createNewTeam(): Team {
        return new Team(-1, 'Team', 0);
    }
    CreateNewCompetitor(): Competitor {
        return new Competitor(-1, 'New', 'Competitor', 'Female', -1, 0, 0);
    }
    createNewCompetition(): any {
        return new Competition(-1, 'New Competition', Date.now(), 'Location');
    }
    private CompetitorCRUD: ICRUD<Competitor>;
    private CompetitionCRUD: ICRUD<Competition>;
    private TeamCRUD: ICRUD<Team>;

    constructor() {
        this.CompetitorCRUD = new CompetitorCRUDLogDecorator(new CompetitorCRUDCacheDecorator(new CompetitorCrud(new CommunicationFacade<Competitor>('competitor'))), new ConsoleLogger());
        this.CompetitionCRUD = new CompetitionCRUDLogDecorator(new CompetitionCRUDCacheDecorator(new CompetitionCrud(new CommunicationFacade<Competition>('competition'))), new ConsoleLogger());
        this.TeamCRUD = new TeamCRUDLogDecorator(new TeamCRUDCacheDecorator(new TeamCrud(new CommunicationFacade<Team>('team'))), new ConsoleLogger());
    }

    getCompetitorsInCompetition(competitorsIds: number[]): Promise<Competitor[]> {
        return new Promise((resolve, reject) => {
            this.getAllCompetitors().then((competitors) => {
                let competitorsInCompetition = [];
                competitors.forEach((competitor) => {
                    let index = competitorsIds.indexOf(competitor.id);
                    if (index !== -1) {
                        competitorsInCompetition.push(competitor);
                    }
                })

                resolve(competitorsInCompetition);
            })
        });
    }

    getSortedTeams(): Promise<Team[]> {
        return this.TeamCRUD.readAll().then((teams) => {
            return teams.sort((a, b) => b.points - a.points);
        });
    }

    getAllTeams(): Promise<Team[]> {
        return this.TeamCRUD.readAll().then((teams) => {
            return teams;
        });
    }
    createTeam(element: Team): Promise<number> {
        return this.TeamCRUD.create(element).then((id) => {
            return id;
        });
    }
    readTeam(id: number): Promise<Team> {
        return this.TeamCRUD.read(id).then((team) => {
            return team;
        });
    }
    updateTeam(id: number, element: Team): Promise<void> {
        return this.TeamCRUD.update(id, element);
    }
    deleteTeam(id: number): Promise<void> {
        return this.TeamCRUD.delete(id);
    }
    getAllCompetitors(): Promise<Competitor[]> {
        return this.CompetitorCRUD.readAll().then((competitors) => {
            return competitors;
        })
    }
    createCompetitor(element: Competitor): Promise<number> {
        return this.CompetitorCRUD.create(element).then((id) => {
            return id;
        })
    }
    readCompetitor(id: number): Promise<Competitor> {
        return this.CompetitorCRUD.read(id).then((competitor) => {
            return competitor;
        })
    }
    updateCompetitor(id: number, element: Competitor): Promise<void> {
        return this.CompetitorCRUD.update(id, element);
    }
    deleteCompetitor(id: number): Promise<void> {
        return this.CompetitorCRUD.delete(id);
    }
    getAllCompetitions(): Promise<Competition[]> {
        return this.CompetitionCRUD.readAll().then((competitions) => {
            return competitions;
        });
    }
    createCompetition(element: Competition): Promise<number> {
        return this.CompetitionCRUD.create(element).then((id) => {
            return id;
        });
    }
    readCompetition(id: number): Promise<Competition> {
        return this.CompetitionCRUD.read(id).then((competition) => {
            return competition;
        });
    }
    updateCompetition(id: number, element: Competition): Promise<void> {
        return this.CompetitionCRUD.update(id, element);
    }
    deleteCompetition(id: number): Promise<void> {
        return this.CompetitionCRUD.delete(id);
    }

}