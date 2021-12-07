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
            this.decoratedObject.update(id, element)
                .then(() => {
                    this.teamCache = [];
                    resolve();
                }, reject);
        });
    }
    delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.delete(id)
                .then(() => {
                    this.teamCache = [];
                    resolve();
                }, reject);
        });
    }
    readAll(): Promise<Team[]> {
        return new Promise((resolve, reject) => {
            if (this.teamCache.length > 0) {
                resolve(this.teamCache);
            }

            this.decoratedObject.readAll()
                .then((teams) => {
                    this.teamCache = teams;
                    resolve(teams);
                }, reject);
        });
    }

}