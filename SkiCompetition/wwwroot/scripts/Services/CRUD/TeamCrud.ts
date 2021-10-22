import Team from "../../Models/Team.js";

export default class TeamCrud implements ICRUD<Team>{
    teams: Array<Team>;

    constructor() {
        this.teams = [
            new Team(1, 'Peshevski Team', 102),
            new Team(2, 'Goshovski Team', 20),
            new Team(3, 'Petkanski Team', 23)
        ];
    }

    Create(element: Team): Promise<number> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/team', {
                method: 'POST',
                body: JSON.stringify(element)
            }).then((data) => {
                return data.json()
            }).then((team) => {
                console.log('team create from postman: ', team);
                resolve(team.id)
            });
        });
    }
    Read(id: number): Promise<Team> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/team', {
                method: 'GET',
                body: JSON.stringify(id)
            }).then((data) => {
                return data.json()
            }).then((t) => {
                console.log('team read from postman: ', t);
                resolve(new Team(t.id, t.name, t.points, t.competitors))
            });
        });
    }
    Update(id: number, element: Team): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/team', {
                method: 'PUT',
                body: JSON.stringify(element)
            }).then((data) => {
                return data.json();
            }).then((team) => {
                console.log('team update: ', team);
                resolve()
            });
        });
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/team'
                , { method: 'DELETE' })
                .then(() => {
                    resolve()
                });
        })
    }
    ReadAll(): Promise<Team[]> {
        return new Promise((resolve, reject) => {
            fetch('https://40a7d272-83ea-401c-bc97-83ae98af35cd.mock.pstmn.io/api/team')
                .then((data) => {
                    return data.json();
                }).then((team) => {
                    resolve(team.map((t) => new Team(t.id, t.name, t.points, t.competitors)));
                });
        })
    }
}