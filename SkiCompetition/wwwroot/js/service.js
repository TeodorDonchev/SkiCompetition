import Competition from "./Models/Competition";
import Competitor from "./Models/Competitor";
import Team from "./Models/Team";
class Service {
    constructor() {
        this.team = new Team(1, 'Peshevski Team');
        this.competitors = [
            new Competitor(1, 'Pesho', 'Peshev', 'Male', this.team),
            new Competitor(2, 'Gosho', 'Goshev', 'Male', this.team),
            new Competitor(3, 'Petranka', 'Vasileva', 'Female', this.team),
            new Competitor(4, 'Pesho', 'Peshev', 'Male', this.team),
            new Competitor(5, 'Gosho', 'Goshev', 'Male', this.team),
            new Competitor(6, 'Petranka', 'Vasileva', 'Female', this.team),
            new Competitor(7, 'Pesho', 'Peshev', 'Male', this.team),
            new Competitor(8, 'Gosho', 'Goshev', 'Male', this.team),
            new Competitor(9, 'Petranka', 'Vasileva', 'Female', this.team),
            new Competitor(10, 'Pesho', 'Peshev', 'Male', this.team),
        ];
        this.competitions = [
            new Competition(1, 'World Cup', new Date(), 'Bansko', this.competitors),
            new Competition(2, 'Borovets Cup', new Date(), 'Borovets', this.competitors),
            new Competition(3, 'Vitosha Cup', new Date(), 'Sofia', this.competitors),
            new Competition(4, 'World Cup 2020', new Date(), 'Bansko', this.competitors),
            new Competition(5, 'World Cup 2021', new Date(), 'Bansko', this.competitors),
            new Competition(6, 'World Cup 2016', new Date(), 'Sofia', this.competitors),
            new Competition(7, 'World Cup 2013', new Date(), 'Bansko', this.competitors),
            new Competition(8, 'World Cup 2012', new Date(), 'Bansko', this.competitors),
            new Competition(9, 'World Cup 2011', new Date(), 'Borovets', this.competitors),
            new Competition(10, 'World Cup 2010', new Date(), 'Bansko', this.competitors),
        ];
    }
}
export default Service;
//# sourceMappingURL=service.js.map