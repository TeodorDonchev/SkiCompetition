using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.ClientModels
{
    public class CompetitionCompetitorRelation
    {
        public static CompetitionCompetitorRelation Create(Models.CompetitionCompetitorRelation competitionCompetitorRelation)
        {
            var cc = new CompetitionCompetitorRelation
            {
                CompetitorId = competitionCompetitorRelation.CompetitorId,
                Time = competitionCompetitorRelation.Time,
                Points = competitionCompetitorRelation.Points,
                Place = competitionCompetitorRelation.Place
            };
            return cc;
        }
        public int CompetitorId { get; set; }
        public int Time { get; set; }
        public int Points { get; set; }
        public int Place { get; set; }

    }
}
