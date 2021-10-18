import Competition from "../../Models/Competition.js";

export default class CompetitionCrud implements ICRUD<Competition>{

    constructor() {

    }

    Create(element: Competition): Promise<number> {
        return new Promise((resolve, reject) => {
            element.id = Math.floor(Math.random() * 1000);

            resolve(element.id);
        });
    }
    Read(id: number): Promise<Competition> {
        return new Promise((resolve, reject) => {
            resolve(new Competition(1, 'World Cup', Date.now(), 'Bansko', [1], true));
        });
    }
    Update(id: number, element: Competition): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve()
        });
    }
    ReadAll(): Promise<Competition[]> {
        return new Promise((resolve, reject) => {
            resolve([
                new Competition(1, 'World Cup', Date.now(), 'Bansko', [1], true),
                new Competition(2, 'Borovets Cup', Date.now(), 'Borovets', [1], false),
            ]);
        });
    }
}