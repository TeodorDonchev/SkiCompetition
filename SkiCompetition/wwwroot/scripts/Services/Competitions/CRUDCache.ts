import Competition from "../../Models/Competition.js";

export default class CompetitionCRUDDecorator implements ICRUD<Competition>{
    competitionCache: Array<Competition>;

    constructor(private decoratedObject: ICRUD<Competition>) {
        this.competitionCache = [];
    }
    create(element: Competition): Promise<number> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.create(element)
                .then((id) => {
                    this.competitionCache.push(element);
                    resolve(id);
                }, reject);
        })
    }
    read(id: number): Promise<Competition> {
        return new Promise((resolve, reject) => {
            let found = this.competitionCache.find((cc) => cc.id === id);

            if (found) {
                return resolve(found);
            }

            this.decoratedObject.read(id)
                .then((competition) => {
                    this.competitionCache.push(competition);
                    resolve(competition);
                }, reject);
        });
    }
    update(id: number, element: Competition): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitionCache.find((cc) => cc.id === id);

            this.decoratedObject.update(id, element).then(() => {
                if (found) {
                    let index = this.competitionCache.indexOf(found);
                    this.competitionCache[index] = element;
                } else {
                    this.competitionCache.push(element);
                }
                resolve();
            }, reject);
        });
    }
    delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitionCache.find((cc) => cc.id === id);

            this.decoratedObject.delete(id).then(() => {
                if (found) {
                    let index = this.competitionCache.indexOf(found);
                    this.competitionCache.splice(index, 1);
                }
                resolve();
            }, reject);
        });
    }
    readAll(): Promise<Competition[]> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.readAll().then((competitions) => {
                resolve(competitions);
            }, reject);
        });
    }
}