import Competitor from "../../Models/Competitor.js";

export default interface ICompetitorService {
    getAllCompetitors(): Promise<Competitor[]>;
    createCompetitor(element: Competitor): Promise<number>;
    readCompetitor(id: number): Promise<Competitor>;
    updateCompetitor(id: number, element: Competitor): Promise<void>;
    deleteCompetitor(id: number): Promise<void>;
}