import Competition from "../../Models/Competition.js";
import CommunicationFacade from "../CommunicationFacade.js";

export default class CompetitionCrud implements ICRUD<Competition>{
    constructor(private CommunicationFacade: CommunicationFacade<Competition>) {
    }

    create(element: Competition): Promise<number> {
        return this.CommunicationFacade.postData(element).then((competition) => {
            return competition.id;
        });
    }
    read(id: number): Promise<Competition> {
        return this.CommunicationFacade.getDataByID(id).then((competition) => {
            return competition;
            /*new Competition(c.id, c.name, c.date, c.location, c.competitors, c.isFinished);*/
        });
    }
    update(id: number, element: Competition): Promise<void> {
        return this.CommunicationFacade.updateData(id, element);
    }
    delete(id: number): Promise<void> {
        return this.CommunicationFacade.deleteData(id);
    }
    readAll(): Promise<Competition[]> {
        return this.CommunicationFacade.getAllData().then((competitions) => {
            return competitions;
                //.map((c) => new Competition(c.id, c.name, c.date, c.location, c.competitors, c.isFinished));
        });
    }
}