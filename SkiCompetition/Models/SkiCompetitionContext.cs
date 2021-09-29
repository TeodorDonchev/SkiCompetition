using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkiCompetition.Models
{
    public class SkiCompetitionContext : DbContext
    {
        public SkiCompetitionContext(DbContextOptions<SkiCompetitionContext> options)
            : base(options)
        {
        }

        public DbSet<Competitor> Competitors { get; set; }
    }
}
