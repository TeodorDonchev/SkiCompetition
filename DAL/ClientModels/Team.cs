using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.ClientModels
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
        public List<Competitor> Competitors { get; set; }
    }
}
