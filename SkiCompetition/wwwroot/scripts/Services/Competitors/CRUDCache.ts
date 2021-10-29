import Competitor from "../../Models/Competitor.js";

export default class CompetitorCRUDCacheDecorator implements ICRUD<Competitor>{

    competitorCache: Array<Competitor>;

    constructor(private decoratedObject: ICRUD<Competitor>) {
        this.competitorCache = [];
    }


    create(element: Competitor): Promise<number> {
        return new Promise((resolve, reject) => {
            this.competitorCache.push(element);
            this.decoratedObject.create(element).then(id => {
                resolve(id);
            }, reject);
        })
    }
    read(id: number): Promise<Competitor> {
        return new Promise((resolve, reject) => {
            let found = this.competitorCache.find((cc) => cc.id === id);

            if (found) {
                return resolve(found);
            }

            this.decoratedObject.read(id)
                .then((competitor) => {
                    this.competitorCache.push(competitor);
                    resolve(competitor);
                }, reject);
        });
    }
    update(id: number, element: Competitor): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitorCache.find((cc) => cc.id === id);

            this.decoratedObject.update(id, element).then(() => {
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
    delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitorCache.find((cc) => cc.id === id);

            this.decoratedObject.delete(id).then(() => {
                if (found) {
                    let index = this.competitorCache.indexOf(found);
                    this.competitorCache.splice(index, 1);
                }
                resolve();
            }, reject);
        })
    }
    readAll(): Promise<Competitor[]> {
        return new Promise((resolve, reject) => {
            this.decoratedObject.readAll().then((competitors) => {
                this.competitorCache = competitors;
                resolve(competitors);
            }, reject);
        })
    }

}