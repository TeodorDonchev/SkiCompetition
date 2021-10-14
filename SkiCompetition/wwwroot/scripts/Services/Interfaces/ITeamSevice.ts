import Team from "../../Models/Team.js";

export default interface ITeamService {
    getAllTeams(): Promise<Team[]>;
    createTeam(element: Team): Promise<number>;
    readTeam(id: number): Promise<Team>;
    updateTeam(id: number, element: Team): Promise<void>;
    deleteTeam(id: number): Promise<void>;
}