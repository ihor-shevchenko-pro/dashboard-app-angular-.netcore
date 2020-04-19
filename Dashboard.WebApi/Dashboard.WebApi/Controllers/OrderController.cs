using System;
using System.Linq;
using System.Threading.Tasks;
using Dashboard.WebApi.ApiModels.Base;
using Dashboard.WebApi.DataContext;
using Dashboard.WebApi.DomainModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dashboard.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly DashboardPostgresContext _context;

        public OrderController(DashboardPostgresContext context)
        {
            _context = context;
        }

        // GET api/order/pageNumber/pageSize
        [HttpGet("{pageIndex:int}/{pageSize:int}")]
        public IActionResult PaginatedOrders(int pageIndex, int pageSize)
        {
            var data = _context.Orders
                       .Include(o => o.Customer)
                       .OrderByDescending(c => c.Placed);

            var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);

            var totalCount = data.Count();
            var totalPages = Math.Ceiling((double)totalCount / pageSize);

            var response = new
            {
                Page = page,
                TotalPages = totalPages
            };

            return Ok(response);
        }

        [HttpGet("by_state")]
        public async Task<ActionResult> OrdersByState()
        {
            var orders = await _context.Orders.Include(o => o.Customer).ToListAsync();

            var groupedResult = orders.GroupBy(r => r.Customer.State)
                                      .ToList()
                                      .Select(grp => new
                                      {
                                        State = grp.Key,
                                        Total = grp.Sum(x => x.OrderTotal)
                                      }).OrderByDescending(r => r.Total)
                                      .ToList();

            return Ok(groupedResult);
        }

        [HttpGet("by_customer/{number}")]
        public async Task<ActionResult> OrdersByCustomer(int number)
        {
            var orders = await _context.Orders.Include(o => o.Customer).ToListAsync();

            var groupedResult = orders.GroupBy(r => r.Customer.Id)
                                      .ToList()
                                      .Select(grp => new
                                       {
                                           Name = _context.Customers.Find(grp.Key).Name,
                                           Total = grp.Sum(x => x.OrderTotal)
                                       }).OrderByDescending(r => r.Total)
                                      .Take(number)
                                      .ToList();

            return Ok(groupedResult);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> Get(int id)
        {
            return await _context.Orders
                                 .Include(o => o.Customer)
                                 .FirstAsync(o => o.Id == id);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Order order)
        {
            if (order == null)
            {
                return BadRequest();
            }

            _context.Orders.Add(order);
            _context.SaveChanges();

            return Ok("success");
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Order order)
        {
            if (order == null || order.Id != id)
            {
                return BadRequest();
            }

            var updatedOrder = _context.Orders.FirstOrDefault(c => c.Id == id);

            if (updatedOrder == null)
            {
                return NotFound();
            }

            updatedOrder.Customer = order.Customer;
            updatedOrder.Completed = order.Completed;
            updatedOrder.OrderTotal = order.OrderTotal;
            updatedOrder.Placed = order.Placed;

            _context.SaveChanges();
            return Ok("success");
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var order = _context.Orders.FirstOrDefault(t => t.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();
            return Ok("success");
        }
    }
}