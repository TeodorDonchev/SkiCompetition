using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace SkiCompetition.Controllers
{
    [Route("api/competitor")]
    [ApiController]
    public class CompetitorsController : ControllerBase
    {
        private readonly SkiCompetitionContext _context;

        public CompetitorsController(SkiCompetitionContext context)
        {
            _context = context;
        }

        // GET: api/Competitors
        [HttpGet]
        public async Task<ActionResult<List<DAL.ClientModels.Competitor>>> GetCompetitors()
        {
            var competitors = await _context.Competitors.ToListAsync();
            var clientCompetitors = new List<DAL.ClientModels.Competitor>();
            foreach (var item in competitors)
            {
                clientCompetitors.Add(DAL.ClientModels.Competitor.Create(item));
            }
            return clientCompetitors;
        }

        // GET: api/Competitors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DAL.ClientModels.Competitor>> GetCompetitor(int id)
        {
            var competitor = await _context.Competitors.FindAsync(id);

            if (competitor == null)
            {
                return NotFound();
            }

            return DAL.ClientModels.Competitor.Create(competitor);
        }

        // PUT: api/Competitors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompetitor(int id, Competitor competitor)
        {
            if (id != competitor.Id)
            {
                return BadRequest();
            }
            _context.Entry(competitor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompetitorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Competitors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Competitor>> PostCompetitor(DAL.ClientModels.Competitor competitor)
        {
            var dbCompetitor = new Competitor
            {
                Id = competitor.Id,
                FirstName = competitor.FirstName,
                LastName = competitor.LastName,
                Sex = competitor.Sex,
                Points = competitor.Points,
                TeamId = competitor.TeamId
            };
            _context.Competitors.Add(dbCompetitor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompetitor", new { id = competitor.Id }, competitor);
        }

        // DELETE: api/Competitors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetitor(int id)
        {
            var competitor = await _context.Competitors.FindAsync(id);
            if (competitor == null)
            {
                return NotFound();
            }
            var relations = await _context.CompetitionCompetitorRelations.Where(relation => relation.CompetitorId == id).ToListAsync();
            if (relations != null)
            {
                _context.CompetitionCompetitorRelations.RemoveRange(relations);
            }

            _context.Competitors.Remove(competitor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompetitorExists(int id)
        {
            return _context.Competitors.Any(e => e.Id == id);
        }
    }
}
