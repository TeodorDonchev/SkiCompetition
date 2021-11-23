using System;
using System.Collections.Generic;
#nullable disable

namespace DAL.Models
{
    public partial class Competition
    {
        public Competition()
        {
            CompetitionCompetitorRelations = new HashSet<CompetitionCompetitorRelation>();
        }

        public static Competition Create(ClientModels.Competition clientCompetition)
        {
            var c = new Competition();
            c.Id = clientCompetition.Id;
            c.Name = clientCompetition.Name;
            c.Location = clientCompetition.Location;
            c.Date = clientCompetition.Date;
            c.IsFinished = clientCompetition.IsFinished;

            var relations = new List<CompetitionCompetitorRelation>();

            foreach (var item in clientCompetition.CompetitorRelations)
            {
                relations.Add(new CompetitionCompetitorRelation
                {
                    CompetitionId = c.Id,
                    CompetitorId = item.CompetitorId,
                    Time = item.Time
                });
            }

            c.CompetitionCompetitorRelations = relations;

            return c;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public bool IsFinished { get; set; }

        public virtual ICollection<CompetitionCompetitorRelation> CompetitionCompetitorRelations { get; set; }
    }
}
