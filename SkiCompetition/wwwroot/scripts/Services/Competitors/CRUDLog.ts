import Competitor from "../../Models/Competitor.js";
import ILogger from "../Interfaces/ILogger.js";

export default class CompetitorCRUDLogDecorator implements ICRUD < Competitor > {

    constructor(private decoratedObject: ICRUD<Competitor>, private logger: ILogger) {

    }

    Create(element: Competitor): Promise<number> {
        return this.decoratedObject.Create(element).then((id) => {
            this.logger.log("created element with id: " + id);
            return id;
        });
    }
    Read(id: number): Promise<Competitor> {
        return this.decoratedObject.Read(id).then((competitor) => {
            this.logger.log("read competitor with id: " + id);
            return competitor;
        })
    }
    Update(id: number, element: Competitor): Promise<void> {
        return this.decoratedObject.Update(id, element).then(() => {
            this.logger.log("updated competitor with id: " + id);
        })
    }
    Delete(id: number): Promise<void> {
        return this.decoratedObject.Delete(id).then(() => {
            this.logger.log("deleted competitor with id: " + id);
        })
    }
    ReadAll(): Promise<Competitor[]> {
        return this.decoratedObject.ReadAll().then((competitors) => {
            this.logger.log("read all competitors");
            return competitors;
        })
    }
}