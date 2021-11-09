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
    [Route("api/competition")]
    [ApiController]
    public class CompetitionsController : ControllerBase
    {
        private readonly SkiCompetitionContext _context;

        public CompetitionsController(SkiCompetitionContext context)
        {
            _context = context;
        }

        // GET: api/Competitions
        [HttpGet]
        public async Task<ActionResult<Dictionary<Competition, List<int>>>> GetCompetitions()
        {

            var relQuery = await _context.Competitions
    .Join(
        _context.CompetitionCompetitorRelations,
        competition => competition.Id,
        relation => relation.CompetitionId,
        (competition, relation) => new
        {
            competition = competition,
            competitorId = relation.CompetitorId
        }
    ).ToArrayAsync();

            var bla = new Dictionary<Competition, List<int>>();
            foreach (var rel in relQuery)
            {
                if (bla[rel.competition] != null)
                    bla[rel.competition].Add(rel.competitorId);
                else
                {
                    var l = new List<int>();
                    l.Add(rel.competitorId);
                    bla[rel.competition] = l;
                }
            }

            return bla;
        }

        // GET: api/Competitions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Competition>> GetCompetition(int id)
        {
            var competition = await _context.Competitions.FindAsync(id);

            if (competition == null)
            {
                return NotFound();
            }

            return competition;
        }

        // PUT: api/Competitions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompetition(int id, Competition competition)
        {
            if (id != competition.Id)
            {
                return BadRequest();
            }

            _context.Entry(competition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompetitionExists(id))
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

        // POST: api/Competitions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Competition>> PostCompetition(Competition competition)
        {
            _context.Competitions.Add(competition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompetition", new { id = competition.Id }, competition);
        }

        // DELETE: api/Competitions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetition(int id)
        {
            var competition = await _context.Competitions.FindAsync(id);
            if (competition == null)
            {
                return NotFound();
            }

            _context.Competitions.Remove(competition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompetitionExists(int id)
        {
            return _context.Competitions.Any(e => e.Id == id);
        }
    }
}
