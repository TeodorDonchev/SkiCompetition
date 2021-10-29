import Service from "../Services/Service.js";
import ContentVM from "../ViewModels/Content.js";

export default abstract class Deck {
    public contentVM: ContentVM;

    constructor(public name: string, service: Service) {
        this.contentVM = this.getContentVM(service);
    }

    abstract getContentVM(servive: Service): ContentVM;
}