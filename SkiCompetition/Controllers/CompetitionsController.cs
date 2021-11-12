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
        public async Task<ActionResult<List<ClientModels.Competition>>> GetCompetitions()
        {
            var competitions = await _context.Competitions
                .Include(x => x.CompetitionCompetitorRelations)
                .ToListAsync();
            var clientCompetitions = new List<ClientModels.Competition>();
            //_context.Competitors.Where(x => x.CompetitionCompetitorRelations.)
            foreach (var item in competitions)
            {
                clientCompetitions.Add(ClientModels.Competition.Create(item));
            }

            return clientCompetitions;
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
        public async Task<IActionResult> PutCompetition(int id, Competition competition, int competitorId)
        {
            if(competitorId == 0)
            {
                Console.WriteLine($"in");

            }

            if (id != competition.Id)
            {
                return BadRequest();
            }

            foreach (var item in competition.CompetitionCompetitorRelations)
            {
                    _context.CompetitionCompetitorRelations.Add(item);
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
            var relations = await _context.CompetitionCompetitorRelations.Where(relation => relation.CompetitionId == id).ToListAsync();
            if (competition == null)
            {
                return NotFound();
            }
            foreach (var item in relations)
            {
                _context.CompetitionCompetitorRelations.Remove(item);
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
