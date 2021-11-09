using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkiCompetition.ClientModels
{
    public class Competitor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Sex { get; set; }
        public int Points { get; set; }
        public Team Team { get; set; }
    }
}
