import Competition from "../../Models/Competition.js";

export default class CompetitionCRUDDecorator implements ICRUD<Competition>{
    competitionCache: Array<Competition>;

    constructor(private decoratedObject: ICRUD<Competition>) {

    }
    Create(element: Competition): Promise<number> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.Create(element)
                .then((id) => {
                    this.competitionCache.push(element);
                    resolve(id);
                }, reject);
        })
    }
    Read(id: number): Promise<Competition> {
        return new Promise((resolve, reject) => {
            let found = this.competitionCache.find((cc) => cc.id === id);

            if (found) {
                return resolve(found);
            }

            this.decoratedObject.Read(id)
                .then((competition) => {
                    this.competitionCache.push(competition);
                    resolve(competition);
                }, reject);
        });
    }
    Update(id: number, element: Competition): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitionCache.find((cc) => cc.id === id);

            this.decoratedObject.Update(id, element).then(() => {
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
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitionCache.find((cc) => cc.id === id);

            this.decoratedObject.Delete(id).then(() => {
                if (found) {
                    let index = this.competitionCache.indexOf(found);
                    this.competitionCache.splice(index, 1);
                }
                resolve();
            }, reject);
        });
    }
    ReadAll(): Promise<Competition[]> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.ReadAll().then((competitions) => {
                resolve(competitions);
            }, reject);
        });
    }
}