import Competitor from "../../Models/Competitor.js";

export default class CompetitorCrud implements ICRUD<Competitor>{
    competitors: Array<Competitor>;
    constructor() {
            //this.competitors = [
            //    new Competitor(1, 'Pesho', 'Peshev', 'Male', new Team(5, 'Testovski', 102), 2),
            //    new Competitor(2, 'Gosho', 'Goshev', 'Male', new Team(6, 'Testovski', 102), 10),
            //    new Competitor(3, 'Petranka', 'Vasileva', 'Female', new Team(7, 'Testovski', 102), 0)
            //];
        
            //this.competitors = [
            //    new Competitor(1, 'Pesho', 'Peshev', 'Male', 1, 2, 52, [1]),
            //    new Competitor(2, 'Gosho', 'Goshev', 'Male', 2, 10, 56, [1]),
            //    new Competitor(3, 'Petranka', 'Vasileva', 'Female', 2, 23, 26, [1])
            //];

    }

    Create(element: Competitor): Promise<number> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competitor', {
                method: 'POST',
                body: JSON.stringify(element)
            }).then((data) => {
                return data.json()
            }).then((competitor) => {
                console.log('competitor create from postman: ', competitor);
                resolve(competitor.id)
            });
        })
    }
    Read(id: number): Promise<Competitor> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competitor', {
                method: 'GET',
                body: JSON.stringify(id)
            }).then((data) => {
                return data.json()
            }).then((c) => {
                console.log('competitor read from postman: ', c);
                resolve(new Competitor(c.id, c.firstName, c.lastName, c.sex, c.teamId, c.points, c.time))
            });
        })
    }
    Update(id: number, element: Competitor): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competitor', {
                method: 'PUT',
                body: JSON.stringify(element)
            }).then((data) => {
                return data.json();
            }).then((competitor) => {
                console.log('competitor update from postman: ', competitor);
                resolve()
            });
        })
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competitor'
                , { method: 'DELETE' })
                .then(() => {
                    resolve()
                }); 
        })
    }
    ReadAll(): Promise<Competitor[]> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competitor')
                .then((data) => {
                    return data.json();
                }).then((competitors) => {
                    console.log('competitors from postman: ', competitors);
                    resolve(competitors.map((c) => new Competitor(c.id, c.firstName, c.lastName, c.sex, c.teamId, c.points, c.time, c.competitions)));
                });
        })
    }
}