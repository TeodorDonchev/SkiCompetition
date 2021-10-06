using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkiCompetition.Models;

namespace SkiCompetition.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<ActionResult<IEnumerable<Competitor>>> GetCompetitors()
        {
            return await _context.Competitors.ToListAsync();
        }

        // GET: api/Competitors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Competitor>> GetCompetitor(int id)
        {
            var competitor = await _context.Competitors.FindAsync(id);

            if (competitor == null)
            {
                return NotFound();
            }

            return competitor;
        }

        // PUT: api/Competitors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompetitor(int id, Competitor competitor)
        {
            if (id != competitor.CompetitorID)
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
        public async Task<ActionResult<Competitor>> PostCompetitor(Competitor competitor)
        {
            _context.Competitors.Add(competitor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompetitor", new { id = competitor.CompetitorID }, competitor);
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

            _context.Competitors.Remove(competitor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompetitorExists(int id)
        {
            return _context.Competitors.Any(e => e.CompetitorID == id);
        }
    }
}
