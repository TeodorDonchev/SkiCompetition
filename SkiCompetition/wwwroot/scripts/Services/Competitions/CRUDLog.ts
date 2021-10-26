import Competition from "../../Models/Competition.js";
import ILogger from "../Interfaces/ILogger.js";

export default class CompetitionCRUDLogDecorator implements ICRUD<Competition>{

    constructor(private decoratedObject: ICRUD<Competition>, private logger: ILogger) {

    }
    Create(element: Competition): Promise<number> {
        return this.decoratedObject.Create(element).then((id) => {
            this.logger.log("created element with id: " + id);
            return id;
        });
    }
    Read(id: number): Promise<Competition> {
        return this.decoratedObject.Read(id).then((competition) => {
            this.logger.log("read competition with id: " + id);
            return competition;
        });
    }
    Update(id: number, element: Competition): Promise<void> {
        return this.decoratedObject.Update(id, element).then(() => {
            this.logger.log("updated competition with id: " + id); 
        });
    }
    Delete(id: number): Promise<void> {
        return this.decoratedObject.Delete(id).then(() => {
            this.logger.log("deleted competition with id: " + id);
        });
    }
    ReadAll(): Promise<Competition[]> {
        return this.decoratedObject.ReadAll().then((competitions) => {
            this.logger.log("read all competitions");
            return competitions;
        });
    }

}