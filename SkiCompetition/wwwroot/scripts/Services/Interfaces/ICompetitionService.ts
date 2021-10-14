import Competition from "../../Models/Competition.js";

export default interface ICompetitionService {
    getAllCompetition(): Promise<Competition[]>;
    CreateCompetition(element: Competition): Promise<number>;
    ReadCompetition(id: number): Promise<Competition>;
    UpdateCompetition(id: number, element: Competition): Promise<void>;
    DeleteCompetition(id: number): Promise<void>;
}