import Competition from "../../Models/Competition.js";

export default interface ICompetitionService {
    getAllCompetitions(): Promise<Competition[]>;
    createCompetition(element: Competition): Promise<number>;
    readCompetition(id: number): Promise<Competition>;
    updateCompetition(id: number, element: Competition): Promise<void>;
    deleteCompetition(id: number): Promise<void>;
}