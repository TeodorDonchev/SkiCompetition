using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkiCompetition.ClientModels
{
    public class CompetitionCompetitorRelation
    {
        public static CompetitionCompetitorRelation Create(DAL.Models.CompetitionCompetitorRelation competitionCompetitorRelation)
        {
            var cc = new CompetitionCompetitorRelation
            {
                CompetitionId = competitionCompetitorRelation.CompetitionId,
                CompetitorId = competitionCompetitorRelation.CompetitorId,
            };
            return cc;
        }
        public int CompetitionId { get; set; }
        public int CompetitorId { get; set; }
    }
}
