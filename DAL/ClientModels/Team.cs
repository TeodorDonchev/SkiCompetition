using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.ClientModels
{
    public class Team
    {
        public static Team Create(Models.Team team, List<int> competitors)
        {
            var c = new Team();
            c.Id = team.Id;
            c.Name = team.Name;
            c.Points = team.Points;
            c.Competitors = competitors;
            return c;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
        public List<int> Competitors{ get; set; }

    }
}
