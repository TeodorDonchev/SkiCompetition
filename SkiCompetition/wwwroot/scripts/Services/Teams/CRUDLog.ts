import Team from "../../Models/Team.js";
import ILogger from "../Interfaces/ILogger.js";

export default class TeamCRUDLogDecorator implements ICRUD<Team>{
    constructor(private decoratedObject: ICRUD<Team>, private logger: ILogger) {

    }
    create(element: Team): Promise<number> {
        return this.decoratedObject.create(element).then((id) => {
            this.logger.log("created team with id: " + id);
            return id;
        });
    }
    read(id: number): Promise<Team> {
        return this.decoratedObject.read(id).then((team) => {
            this.logger.log("read team with id: " +  team.id)
            return team;
        });
    }
    update(id: number, element: Team): Promise<void> {
        return this.decoratedObject.update(id, element).then(() => {
            this.logger.log("updated team with id: " + id);
        });
    }
    delete(id: number): Promise<void> {
        return this.decoratedObject.delete(id).then(() => {
            this.logger.log("deleted team with id: " + id);
        })
    }
    readAll(): Promise<Team[]> {
        return this.decoratedObject.readAll().then((teams) => {
            this.logger.log("read all teams");
            return teams;
        })
    }
}