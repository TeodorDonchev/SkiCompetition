using System;
using System.Collections.Generic;

#nullable disable

namespace SkiCompetition.Models
{
    public partial class Competition
    {
        public Competition()
        {
            CompetitionCompetitorRelations = new HashSet<CompetitionCompetitorRelation>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public bool isFinished { get; set; }

        public virtual ICollection<CompetitionCompetitorRelation> CompetitionCompetitorRelations { get; set; }
    }
}
