import Service from "../Services/Service.js";

export default abstract class ContentVM {
    constructor(public service: Service) {
    }
}