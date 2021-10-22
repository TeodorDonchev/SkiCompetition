import Competition from "../../Models/Competition.js";

export default class CompetitionCrud implements ICRUD<Competition>{

    constructor() {

    }

    Create(element: Competition): Promise<number> {
        return new Promise((resolve, reject) => {
            //element.id = Math.floor(Math.random() * 1000);
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competition', {
                method: 'POST',
                body: JSON.stringify(element)
            }).then((data) => {
                return data.json()
            }).then((competition) => {
                console.log('competition create from postman: ', competition);
                resolve(competition.id)
            });
            //resolve(element.id);
        });
    }
    Read(id: number): Promise<Competition> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competition', {
                method: 'GET',
                body: JSON.stringify(id)
            }).then((data) => {
                return data.json()
            }).then((c) => {
                console.log('competition read: ', c);
                resolve(new Competition(c.id, c.name, c.date, c.location, c.competitors, c.isFinished))
            });
            //resolve(new Competition(1, 'World Cup', Date.now(), 'Bansko', [1], true));
        });
    }
    Update(id: number, element: Competition): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competition', {
                method: 'PUT',
                body: JSON.stringify(element)
            }).then((data) => {
                return data.json();
            }).then((competition) => {
                console.log('competition update: ', competition);
                resolve( )
            });
        });
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competition'
                , { method: 'DELETE' })
                .then(() => {
                    resolve()
                });
        });
    }
    ReadAll(): Promise<Competition[]> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/competition')
                .then((data) => {
                    return data.json();
                }).then((competitions) => {
                    resolve(competitions.map((c) => new Competition(c.id, c.name, c.date, c.location, c.competitors, c.isFinished)));
                });
            //resolve([
            //    new Competition(1, 'World Cup', Date.now(), 'Bansko', [1], true),
            //    new Competition(2, 'Borovets Cup', Date.now(), 'Borovets', [1], false),
            //]);
        });
    }
}