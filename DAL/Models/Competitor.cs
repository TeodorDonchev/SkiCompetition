using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class Competitor
    {
        public Competitor()
        {
            CompetitionCompetitorRelations = new HashSet<CompetitionCompetitorRelation>();
        }

        public static Competitor Create(ClientModels.Competitor competitor)
        {
            var c = new Competitor
            {
                Id = competitor.Id,
                FirstName = competitor.FirstName,
                LastName = competitor.LastName,
                Points = competitor.Points,
                Sex = competitor.Sex,
                TeamId = competitor.TeamId
            };
            return c;
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Sex { get; set; }
        public int Points { get; set; }
        public int TeamId { get; set; }

        public virtual Team Team { get; set; }
        public virtual ICollection<CompetitionCompetitorRelation> CompetitionCompetitorRelations { get; set; }
    }
}
