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
    [Route("api/team")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly SkiCompetitionContext _context;

        public TeamsController(SkiCompetitionContext context)
        {
            _context = context;
        }

        // GET: api/Teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DAL.ClientModels.Team>>> GetTeams()
        {
            var teams = await _context.Teams.ToListAsync();
            var clientTeams = new List<DAL.ClientModels.Team>();

            foreach (var team in teams)
            {
                var competitorsInTeam = await _context.Competitors.Where(c => c.TeamId == team.Id).Select(c => c.Id).ToListAsync();
                
                clientTeams.Add(DAL.ClientModels.Team.Create(team, competitorsInTeam));
            }

            return clientTeams;
        }

        // GET: api/Teams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DAL.ClientModels.Team>> GetTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            var competitorsInTeam = await _context.Competitors.Where(c => c.TeamId == team.Id).Select(c => c.Id).ToListAsync();

            return DAL.ClientModels.Team.Create(team, competitorsInTeam);
        }

        // PUT: api/Teams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeam(int id, DAL.ClientModels.Team team)
        {
            if (id != team.Id)
            {
                return BadRequest();
            }
            var dbTeam = new Team
            {
                Id = team.Id,
                Name = team.Name,
                Points = team.Points
            };

            _context.Entry(dbTeam).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
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

        // POST: api/Teams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DAL.Models.Team>> PostTeam(DAL.ClientModels.Team team)
        {
            var dbTeam = new Team
            {
                Id = team.Id,
                Name = team.Name,
                Points = team.Points
            };

            _context.Teams.Add(dbTeam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeam", new { id = team.Id }, team);
        }

        // DELETE: api/Teams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }

            _context.Teams.Remove(team);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeamExists(int id)
        {
            return _context.Teams.Any(e => e.Id == id);
        }
    }
}
