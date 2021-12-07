using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public partial class CompetitorTeamRelation
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        public int CompetitorId { get; set; }

        public virtual Team Team { get; set; }
        public virtual Competitor Competitor { get; set; }
    }
}
