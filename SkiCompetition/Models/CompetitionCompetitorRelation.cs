using System;
using System.Collections.Generic;

#nullable disable

namespace SkiCompetition.Models
{
    public partial class CompetitionCompetitorRelation
    {
        public int Id { get; set; }
        public int CompetitionId { get; set; }
        public int CompetitorId { get; set; }

        public virtual Competition Competition { get; set; }
        public virtual Competitor Competitor { get; set; }
    }
}
