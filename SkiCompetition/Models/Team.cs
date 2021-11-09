using System;
using System.Collections.Generic;

#nullable disable

namespace SkiCompetition.Models
{
    public partial class Team
    {
        public Team()
        {
            Competitors = new HashSet<Competitor>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }

        public virtual ICollection<Competitor> Competitors { get; set; }
    }
}
