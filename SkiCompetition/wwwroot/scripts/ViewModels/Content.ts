import Service from "../Services/Service.js";

export default abstract class ContentVM {
    abstract refreshResults (): void;
    constructor(public service: Service) {
    }
}