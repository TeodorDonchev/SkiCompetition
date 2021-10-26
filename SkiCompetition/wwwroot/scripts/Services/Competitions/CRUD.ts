import Competition from "../../Models/Competition.js";
import CommunicationFacade from "../CommunicationFacade.js";

export default class CompetitionCrud implements ICRUD<Competition>{
    constructor(private CommunicationFacade: CommunicationFacade) {
    }

    Create(element: Competition): Promise<number> {
        return this.CommunicationFacade.postData(element).then((competition) => {
            return competition.id;
        });
    }
    Read(id: number): Promise<Competition> {
        return this.CommunicationFacade.getDataByID(id).then((c) => {
            return new Competition(c.id, c.name, c.date, c.location, c.competitors, c.isFinished);
        });
    }
    Update(id: number, element: Competition): Promise<void> {
        return this.CommunicationFacade.updateData(id, element);
    }
    Delete(id: number): Promise<void> {
        return this.CommunicationFacade.deleteData(id);
    }
    ReadAll(): Promise<Competition[]> {
        return this.CommunicationFacade.getAllData().then((competitions) => {
            return competitions.map((c) => new Competition(c.id, c.name, c.date, c.location, c.competitors, c.isFinished));
        });
    }
}