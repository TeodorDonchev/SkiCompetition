using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.ClientModels
{
    public class Competitor
    {
        public static Competitor Create(Models.Competitor competitor)
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
    }
}
