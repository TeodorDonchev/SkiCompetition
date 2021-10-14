import LService from "../Services/LService.js";
import ContentVM from "../ViewModels/Content.js";

export default abstract class Deck {
    public contentVM: ContentVM;

    constructor(public Name: string, service: LService) {
        this.contentVM = this.getContentVM(service);
    }

    abstract getContentVM(servive: LService): ContentVM;
}