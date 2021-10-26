import Team from "../../Models/Team.js";
import CommunicationFacade from "../CommunicationFacade.js";

export default class TeamCrud implements ICRUD<Team>{
    constructor(private CommunicationFacade: CommunicationFacade) {
    }

    Create(element: Team): Promise<number> {
        return this.CommunicationFacade.postData(element).then((team) => {
            return team.id;
        });   
    }
    Read(id: number): Promise<Team> {
        return this.CommunicationFacade.getDataByID(id).then((t) => {
            return new Team(t.id, t.name, t.points, t.competitors);
        });
    }
    Update(id: number, element: Team): Promise<void> {
        return this.CommunicationFacade.updateData(id, element);
    }
    Delete(id: number): Promise<void> {
        return this.CommunicationFacade.deleteData(id);
    }
    ReadAll(): Promise<Team[]> {
        return this.CommunicationFacade.getAllData().then((competitions) => {
            return competitions.map((t) => new Team(t.id, t.name, t.points, t.competitors));
        });
    }
}