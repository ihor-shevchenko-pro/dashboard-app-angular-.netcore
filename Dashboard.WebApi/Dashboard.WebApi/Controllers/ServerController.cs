using System.Linq;
using System.Threading.Tasks;
using Dashboard.WebApi.ApiModels;
using Dashboard.WebApi.DataContext;
using Dashboard.WebApi.DomainModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dashboard.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ServerController : Controller
    {
        private readonly DashboardPostgresContext _context;

        public ServerController(DashboardPostgresContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var response = await _context.Servers.OrderBy(s => s.Id).ToListAsync();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<Server> Get(int id)
        {
            return await _context.Servers.FindAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Server server)
        {
            if (server == null)
            {
                return BadRequest();
            }

            await _context.Servers.AddAsync(server);
            await _context.SaveChangesAsync();

            return Ok("success");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Message(int id, [FromBody] ServerMessageApiModel model)
        {

            var server = await _context.Servers.FirstOrDefaultAsync(s => s.Id == id);
            if (server == null) return NotFound();

            // move update handling to a service, perhaps
            if (model.Payload == "activate")
            {
                server.IsOnline = true;
                await _context.SaveChangesAsync();
            }

            if (model.Payload == "deactivate")
            {
                server.IsOnline = false;
                await _context.SaveChangesAsync();
            }

            return Ok("success");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var server = await _context.Servers.FirstOrDefaultAsync(t => t.Id == id);
            if (server == null)
            {
                return NotFound();
            }

            _context.Servers.Remove(server);
            await _context.SaveChangesAsync();

            return Ok("success");
        }
    }
}