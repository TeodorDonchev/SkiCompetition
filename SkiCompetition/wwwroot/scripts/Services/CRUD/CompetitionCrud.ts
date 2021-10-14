import Competition from "../../Models/Competition.js";
import CompetitorCrud from "./CompetitorCrud.js";

export default class CompetitionCrud implements ICRUD<Competition>{
    competitions: Array<Competition>;
    competitorCRUD: CompetitorCrud;

    constructor() {
        this.competitorCRUD = new CompetitorCrud();

        this.competitions = [
            new Competition(1, 'World Cup', new Date(), 'Bansko', [1], true),
            new Competition(2, 'Borovets Cup', new Date(), 'Borovets',[1], false),
        ];

    }

    Create(element: Competition): Promise<number> {
        return new Promise((resolve, reject) => {
            let found = this.competitions.find((competition) => competition.name === element.name);

            if (found) {
                reject('This competition name is already taken.');
            } else {
                this.competitions.push(element);
                resolve(element.id);
            }
        });
    }
    Read(id: number): Promise<Competition> {
        return new Promise((resolve, reject) => {
            let found = this.competitions.find((competition) => competition.id === id);

            if (found) {
                resolve(found);
            } else {
                reject('There is no competition with id: ' + id);
            }
        });
    }
    Update(id: number, element: Competition): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitions.find((competition) => competition.id === id);

            if (found) {
                let index = this.competitions.indexOf(found);
                this.competitions[index] = element;
                resolve();
            } else {
                reject('There is no competition with id: ' + id);
            }
        });
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.competitions.find((competition) => competition.id === id);

            if (found) {
                let index = this.competitions.indexOf(found);
                this.competitions.splice(index, 1);
                resolve();
            } else {
                reject('There is no competition with id: ' + id);
            }
        });
    }
    ReadAll(): Promise<Competition[]> {
        return new Promise((resolve, reject) => {
            resolve(this.competitions);
        });
    }
}