import Competitor from "../../Models/Competitor.js";
import CommunicationFacade from "../CommunicationFacade.js";

export default class CompetitorCrud implements ICRUD<Competitor>{
    competitors: Array<Competitor>;
    constructor(private CommunicationFacade: CommunicationFacade<Competitor>) {
         
    }

    Create(element: Competitor): Promise<number> {
        return this.CommunicationFacade.postData(element).then((competitor) => {
            return competitor.id;
        });
    }
    Read(id: number): Promise<Competitor> {
        return this.CommunicationFacade.getDataByID(id).then((competitor) => {
            return competitor;
            /*new Competitor(c.id, c.firstName, c.lastName, c.sex, c.teamId, c.points, c.time);*/
        });
    }
    Update(id: number, element: Competitor): Promise<void> {
        return this.CommunicationFacade.updateData(id, element);
    }
    Delete(id: number): Promise<void> {
        return this.CommunicationFacade.deleteData(id);
    }
    ReadAll(): Promise<Competitor[]> {
        return this.CommunicationFacade.getAllData().then((competitions) => {
            return competitions;
                //.map((c) => new Competitor(c.id, c.firstName, c.lastName, c.sex, c.teamId, c.points, c.time, c.competitions));
        });
    }
}