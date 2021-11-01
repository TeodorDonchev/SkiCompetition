import Service from "../Services/Service.js";

export default abstract class ContentVM {
    refreshResults: () => void;
    constructor(public service: Service) {
    }
}