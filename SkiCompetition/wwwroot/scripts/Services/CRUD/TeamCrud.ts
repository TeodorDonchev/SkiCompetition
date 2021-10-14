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
            let found = this.teams.find((team) => team.name === element.name);
            if (found) {
                reject('Team name already taken.');
            } else {
                this.teams.push(element);
                resolve(element.id);
            }
        });
    }
    Read(id: number): Promise<Team> {
        return new Promise((resolve, reject) => {
            let found = this.teams.find((team) => team.id === id);

            if (found) {
                resolve(found);
            } else {
                reject('There is no team with id: ' + id);
            }
        });
    }
    Update(id: number, element: Team): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.teams.find((team) => team.id === id);

            if (found) {
                let index = this.teams.indexOf(found);
                this.teams[index] = element;
                resolve();
            } else {
                reject('There is no team with id: ' + id);
            }
        });
    }
    Delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let found = this.teams.find((team) => team.id === id);

            if (found) {
                let index = this.teams.indexOf(found);
                this.teams.splice(index, 1);
                resolve();
            } else {
                reject('There is no team with id: ' + id);
            }
        })
    }
    ReadAll(): Promise<Team[]> {
        return new Promise((resolve, reject) => {
            resolve(this.teams);
        })
    }
}