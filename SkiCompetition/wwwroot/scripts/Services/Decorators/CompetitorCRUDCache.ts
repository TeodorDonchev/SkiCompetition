import Competitor from "../../Models/Competitor.js";

export default class CompetitorCRUDCacheDecorator implements ICRUD<Competitor>{

    competitorCache: Array<Competitor>;

    constructor(private decoratedObject: ICRUD<Competitor>) {

    }


    Create(element: Competitor): Promise<number> {
        return new Promise((resolve, reject) => {
            this.competitorCache.push(element);
            this.decoratedObject.Create(element).then(id => {
                resolve(id);
            }, reject);
        })
    }
    Read(id: number): Promise<Competitor> {
        return new Promise((resolve, reject) => {
            let found = this.competitorCache.find((cc) => cc.id === id);

            if (found) {
                return resolve(found);
            }

            this.decoratedObject.Read(id)
                .then((competitor) => {
                    this.competitorCache.push(competitor);
                    resolve(competitor);
                }, reject);
        });
    }
    Update(id: number, element: Competitor): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitorCache.find((cc) => cc.id === id);

            this.decoratedObject.Update(id, element).then(() => {
                if (found) {
                    let index = this.competitorCache.indexOf(found);
                    this.competitorCache[index] = element;
                } else {
                    this.competitorCache.push(element);
                }
                resolve();
            }, reject)
            
            
        })
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitorCache.find((cc) => cc.id === id);

            this.decoratedObject.Delete(id).then(() => {
                if (found) {
                    let index = this.competitorCache.indexOf(found);
                    this.competitorCache.splice(index, 1);
                }
                resolve();
            }, reject);
        })
    }
    ReadAll(): Promise<Competitor[]> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.ReadAll().then((competitors) => {
                resolve(competitors);
            }, reject);
        })
    }

}