import Competitor from "../../Models/Competitor.js";

export default class CompetitorCrud implements ICRUD<Competitor>{
    competitors: Array<Competitor>;
    constructor() {
            //this.competitors = [
            //    new Competitor(1, 'Pesho', 'Peshev', 'Male', new Team(5, 'Testovski', 102), 2),
            //    new Competitor(2, 'Gosho', 'Goshev', 'Male', new Team(6, 'Testovski', 102), 10),
            //    new Competitor(3, 'Petranka', 'Vasileva', 'Female', new Team(7, 'Testovski', 102), 0)
            //];
        
            this.competitors = [
                new Competitor(1, 'Pesho', 'Peshev', 'Male', 1, 2, 52, [1]),
                new Competitor(2, 'Gosho', 'Goshev', 'Male', 2, 10, 56, [1]),
                new Competitor(3, 'Petranka', 'Vasileva', 'Female', 2, 23, 26, [1])
            ];

    }

    Create(element: Competitor): Promise<number> {
        return new Promise((resolve, reject) => {
            this.competitors.push(element);
            resolve(element.id);
        })
    }
    Read(id: number): Promise<Competitor> {
        return new Promise((resolve, reject) => {
            let found = this.competitors.find((competitor) => competitor.id === id);

            if (found) {
                resolve(found);
            } else {
                reject("There is no competitior with id: " + id);
            }
        })
    }
    Update(id: number, element: Competitor): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitors.find((competitor) => competitor.id === id)

            if (found) {
                let index = this.competitors.indexOf(found);
                this.competitors[index] = element;
                resolve();
            } else {
                reject("There is no competitior with id: " + id);
            }
        })
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitors.find((competitor) => competitor.id === id)

            if (found) {
                let index = this.competitors.indexOf(found);
                this.competitors.splice(index, 1);
                resolve();
            } else {
                reject("There is no competitior with id: " + id);
            }
        })
    }
    ReadAll(): Promise<Competitor[]> {
        return new Promise((resolve, reject) => {
            console.log('from competitor crud [competitors]: ', this.competitors);
            console.log('this from readAll', this);
            resolve(this.competitors);
        })
    }
}