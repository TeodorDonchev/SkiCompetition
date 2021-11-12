using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkiCompetition.ClientModels
{
    public class Competition
    {
        public static Competition Create(DAL.Models.Competition competition)
        {
            var c = new Competition();
            c.Id = competition.Id;
            c.Name = competition.Name;
            c.Location = competition.Location;
            c.Date = competition.Date;
            c.IsFinished = competition.IsFinished;
            c.CompetitorRelations = new List<ClientModels.CompetitionCompetitorRelation>();
            foreach (var item in competition.CompetitionCompetitorRelations)
            {
               c.CompetitorRelations.Add(ClientModels.CompetitionCompetitorRelation.Create(item));
            }
            return c;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public bool IsFinished { get; set; }
        public List<ClientModels.CompetitionCompetitorRelation> CompetitorRelations { get; set; }

    }
}
