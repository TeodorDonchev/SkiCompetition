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

            var competitionFromDB = _context.Competitions.Single(c => c.Id == id);

            if (competitionFromDB.IsFinished)
            {
                return StatusCode(405);
            }

            var relations = _context.CompetitionCompetitorRelations.Where(x => x.CompetitionId == id);
            if (relations != null)
            {
                _context.CompetitionCompetitorRelations.RemoveRange(relations);
            }
            if (competition.IsFinished)
            {
                var didNotStart = new List<DAL.ClientModels.CompetitionCompetitorRelation>(competition.CompetitorRelations.Where(c => c.Time == 0));
                competition.CompetitorRelations.RemoveAll(c => c.Time == 0);
                competition.CompetitorRelations.Sort((a, b) => a.Time - b.Time);
                var points = 100;
                for (int i = 0; i < competition.CompetitorRelations.Count; i++)
                {
                    competition.CompetitorRelations[i].Place = i + 1;
                    competition.CompetitorRelations[i].Points = points;
                    var competitor = _context.Competitors.Find(competition.CompetitorRelations[i].CompetitorId);
                    competitor.Points += points;
                    _context.Teams.Find(competitor.TeamId).Points += points;
                    if (points > 0)
                    {
                        points -= 10;
                    }
                }
                foreach (var item in didNotStart)
                {
                    competition.CompetitorRelations.Add(item);
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

            //nz
            var dbCompetition = new Competition
            {
                Id = competition.Id,
                Name = competition.Name,
                Location = competition.Location,
                Date = competition.Date,
                IsFinished = competition.IsFinished
            };

            var dbRelations = new List<CompetitionCompetitorRelation>();

            foreach (var item in competition.CompetitorRelations)
            {
                dbRelations.Add(new CompetitionCompetitorRelation
                {
                    CompetitionId = competition.Id,
                    CompetitorId = item.CompetitorId,
                    Time = item.Time
                });
            }

            _context.Entry(dbCompetition).State = EntityState.Modified;

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
            var dbCompetition = new Competition
            {
                Name = competition.Name,
                Location = competition.Location,
                Date = competition.Date,
                IsFinished = competition.IsFinished
            };

            var dbRelations = new List<CompetitionCompetitorRelation>();



            _context.Competitions.Add(dbCompetition);
            await _context.SaveChangesAsync();
            var addedCompetitionId = _context.Competitions.Max(c => c.Id);
            foreach (var item in competition.CompetitorRelations)
            {
                _context.CompetitionCompetitorRelations.Add(new CompetitionCompetitorRelation
                {
                    CompetitionId = addedCompetitionId,
                    CompetitorId = item.CompetitorId,
                    Time = item.Time,
                    Place = item.Place,
                    Points = item.Points
                });
            }
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
