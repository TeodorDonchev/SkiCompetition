import Competitor from "../../Models/Competitor.js";

export default interface ICompetitorService {
    getAllCompetitors(): Promise<Competitor[]>;
    CreateCompetitor(element: Competitor): Promise<number>;
    ReadCompetitor(id: number): Promise<Competitor>;
    UpdateCompetitor(id: number, element: Competitor): Promise<void>;
    DeleteCompetitor(id: number): Promise<void>;
}