import Team from "../../Models/Team.js";
import CommunicationFacade from "../CommunicationFacade.js";

export default class TeamCrud implements ICRUD<Team>{
    constructor(private CommunicationFacade: CommunicationFacade<Team>) {
    }

    create(element: Team): Promise<number> {
        return this.CommunicationFacade.postData(element).then((team) => {
            return team.id;
        });   
    }
    read(id: number): Promise<Team> {
        return this.CommunicationFacade.getDataByID(id).then((team) => {
            return team;
            //new Team(t.id, t.name, t.points, t.competitors);
        });
    }
    update(id: number, element: Team): Promise<void> {
        return this.CommunicationFacade.updateData(id, element);
    }
    delete(id: number): Promise<void> {
        return this.CommunicationFacade.deleteData(id);
    }
    readAll(): Promise<Team[]> {
        return this.CommunicationFacade.getAllData().then((teams) => {
            return teams;
                //.map((t) => new Team(t.id, t.name, t.points, t.competitors));
        });
    }
}