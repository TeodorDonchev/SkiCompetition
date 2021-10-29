import Competitor from "../../Models/Competitor.js";
import ILogger from "../Interfaces/ILogger.js";

export default class CompetitorCRUDLogDecorator implements ICRUD < Competitor > {

    constructor(private decoratedObject: ICRUD<Competitor>, private logger: ILogger) {

    }

    create(element: Competitor): Promise<number> {
        return this.decoratedObject.create(element).then((id) => {
            this.logger.log("created element with id: " + id);
            return id;
        });
    }
    read(id: number): Promise<Competitor> {
        return this.decoratedObject.read(id).then((competitor) => {
            this.logger.log("read competitor with id: " + id);
            return competitor;
        })
    }
    update(id: number, element: Competitor): Promise<void> {
        return this.decoratedObject.update(id, element).then(() => {
            this.logger.log("updated competitor with id: " + id);
        })
    }
    delete(id: number): Promise<void> {
        return this.decoratedObject.delete(id).then(() => {
            this.logger.log("deleted competitor with id: " + id);
        })
    }
    readAll(): Promise<Competitor[]> {
        return this.decoratedObject.readAll().then((competitors) => {
            this.logger.log("read all competitors");
            return competitors;
        })
    }
}