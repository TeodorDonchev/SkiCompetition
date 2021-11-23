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
        public async Task<ActionResult<List<DAL.ClientModels.Competition>>> GetCompetitions()
        {
            var competitions = await _context.Competitions
                .Include(x => x.CompetitionCompetitorRelations)
                .ToListAsync();
            var clientCompetitions = new List<DAL.ClientModels.Competition>();
            //_context.Competitors.Where(x => x.CompetitionCompetitorRelations.)
            foreach (var item in competitions)
            {
                clientCompetitions.Add(DAL.ClientModels.Competition.Create(item));
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
        public async Task<IActionResult> PutCompetition(int id, DAL.ClientModels.Competition competition)
        {
            if (id != competition.Id)
            {
                return BadRequest();
            }

            var relations = _context.CompetitionCompetitorRelations.Where(x => x.CompetitionId == id);
            if (relations != null)
            {
                _context.CompetitionCompetitorRelations.RemoveRange(relations);
            }
            if (competition.IsFinished)
            {
                var didNotStart = competition.CompetitorRelations.Select(c => c.Time == 0);
                competition.CompetitorRelations.RemoveAll(c => c.Time == 0);
                competition.CompetitorRelations.OrderBy(c => c.Time);
                var points = 100;
                for (int i = 0; i < competition.CompetitorRelations.Count; i++)
                {
                    competition.CompetitorRelations[i].Place = i + 1;
                    competition.CompetitorRelations[i].Points = points;
                    _context.Competitors.Find(competition.CompetitorRelations[i].CompetitorId).Points += points;
                    if (points > 0)
                    {
                        points -= 10;
                    }
                }
            }

            foreach (var item in competition.CompetitorRelations)
            {
                _context.CompetitionCompetitorRelations.Add(new CompetitionCompetitorRelation
                {
                    CompetitionId = id,
                    CompetitorId = item.CompetitorId,
                    Time = item.Time,
                    Place = item.Place,
                    Points = item.Points
                });
            }

            _context.Entry(DAL.Models.Competition.Create(competition)).State = EntityState.Modified;

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
        public async Task<ActionResult<Competition>> PostCompetition(DAL.ClientModels.Competition competition)
        {
            _context.Competitions.Add(DAL.Models.Competition.Create(competition));
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
            var relations = await _context.CompetitionCompetitorRelations.Where(relation => relation.CompetitionId == id).ToListAsync();
            if (relations != null)
            {
                foreach (var item in relations)
                {
                    _context.CompetitionCompetitorRelations.Remove(item);
                }
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
