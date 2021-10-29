import Competition from "../../Models/Competition.js";
import ILogger from "../Interfaces/ILogger.js";

export default class CompetitionCRUDLogDecorator implements ICRUD<Competition>{

    constructor(private decoratedObject: ICRUD<Competition>, private logger: ILogger) {

    }
    create(element: Competition): Promise<number> {
        return this.decoratedObject.create(element).then((id) => {
            this.logger.log("created element with id: " + id);
            return id;
        });
    }
    read(id: number): Promise<Competition> {
        return this.decoratedObject.read(id).then((competition) => {
            this.logger.log("read competition with id: " + id);
            return competition;
        });
    }
    update(id: number, element: Competition): Promise<void> {
        return this.decoratedObject.update(id, element).then(() => {
            this.logger.log("updated competition with id: " + id); 
        });
    }
    delete(id: number): Promise<void> {
        return this.decoratedObject.delete(id).then(() => {
            this.logger.log("deleted competition with id: " + id);
        });
    }
    readAll(): Promise<Competition[]> {
        return this.decoratedObject.readAll().then((competitions) => {
            this.logger.log("read all competitions");
            return competitions;
        });
    }

}