import Team from "../../Models/Team.js";
import ILogger from "../Interfaces/ILogger.js";

export default class TeamCRUDLogDecorator implements ICRUD<Team>{
    constructor(private decoratedObject: ICRUD<Team>, private logger: ILogger) {

    }
    Create(element: Team): Promise<number> {
        return this.decoratedObject.Create(element).then((id) => {
            this.logger.log("created team with id: " + id);
            return id;
        });
    }
    Read(id: number): Promise<Team> {
        return this.decoratedObject.Read(id).then((team) => {
            this.logger.log("read team with id: " +  team.id)
            return team;
        });
    }
    Update(id: number, element: Team): Promise<void> {
        return this.decoratedObject.Update(id, element).then(() => {
            this.logger.log("updated team with id: " + id);
        });
    }
    Delete(id: number): Promise<void> {
        return this.decoratedObject.Delete(id).then(() => {
            this.logger.log("deleted team with id: " + id);
        })
    }
    ReadAll(): Promise<Team[]> {
        return this.decoratedObject.ReadAll().then((teams) => {
            this.logger.log("read all teams");
            return teams;
        })
    }
}