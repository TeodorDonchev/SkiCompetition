import Team from "../../Models/Team.js";

export default class TeamCRUDCacheDecorator implements ICRUD<Team>{

    teamCache: Array<Team>;

    constructor(private decoratedObject: ICRUD<Team>) {

        this.teamCache = [];
    }
    create(element: Team): Promise<number> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.create(element)
                .then(id => {
                    this.teamCache.push(element);
                    resolve(id);
                }, reject);
        })
    }
    read(id: number): Promise<Team> {
        return new Promise((resolve, reject) => {
            let found = this.teamCache.find((team) => team.id === id)
            if (found) {
                return resolve(found);
            }
            this.decoratedObject.read(id)
                .then((servedObject) => {
                    this.teamCache.push(servedObject);
                    resolve(servedObject);
                }, reject);
        });
    }
    update(id: number, element: Team): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.teamCache.find((team) => team.id === id);

            this.decoratedObject.update(id, element)
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
    delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.teamCache.find((team) => team.id === id);

            this.decoratedObject.delete(id)
                .then(() => {
                    if (found) {
                        let index = this.teamCache.indexOf(found);
                        this.teamCache.splice(index, 1);
                    }
                    resolve();
                }, reject);
        });
    }
    readAll(): Promise<Team[]> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.readAll()
                .then((teams) => {
                    resolve(teams);
                }, reject);
        });
    }

}