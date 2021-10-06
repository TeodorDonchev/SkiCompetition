using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkiCompetition.Models
{
    public class Competition
    {
        public int CompetitionID { get; set; }
        public string Name{ get; set; }
        public DateTime Date{ get; set; }
        public string Location{ get; set; }
        public bool isFinished { get; set; }
        public List<Competitor> Competitors { get; set; }
    }
}
