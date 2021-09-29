using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkiCompetition.Models
{
    public class Competitor
    {
        public int Id{ get; set; }
        public string Name{ get; set; }
        public string Team{ get; set; }
    }
}