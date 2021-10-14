import Team from "../../Models/Team.js";

export default class TeamCRUDCacheDecorator implements ICRUD<Team>{

    teamCache: Array<Team>;

    constructor(private decoratedObject: ICRUD<Team>) {

    }
    Create(element: Team): Promise<number> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.Create(element)
                .then(id => {
                    this.teamCache.push(element);
                    resolve(id);
                }, reject);
        })
    }
    Read(id: number): Promise<Team> {
        return new Promise((resolve, reject) => {
            let found = this.teamCache.find((team) => team.id === id)
            if (found) {
                return resolve(found);
            }
            this.decoratedObject.Read(id)
                .then((servedObject) => {
                    this.teamCache.push(servedObject);
                    resolve(servedObject);
                }, reject);
        });
    }
    Update(id: number, element: Team): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.teamCache.find((team) => team.id === id);

            this.decoratedObject.Update(id, element)
                .then(() => {
                    if (found) {
                        let index = this.teamCache.indexOf(found);
                        this.teamCache[index] = element;
                    } else {
                        this.teamCache.push(element);
                    }
                    resolve();
                }, reject);
        });
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.teamCache.find((team) => team.id === id);

            this.decoratedObject.Delete(id)
                .then(() => {
                    if (found) {
                        let index = this.teamCache.indexOf(found);
                        this.teamCache.splice(index, 1);
                    }
                    resolve();
                }, reject);
        });
    }
    ReadAll(): Promise<Team[]> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.ReadAll()
                .then((teams) => {
                    resolve(teams);
                }, reject);
        });
    }

}