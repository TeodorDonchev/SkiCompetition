import LService from "../Services/LService.js";

export default abstract class ContentVM {
    constructor(public service: LService) {
    }
}