using Dashboard.WebApi.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace Dashboard.WebApi.DataContext
{
    public class DashboardPostgresContext : DbContext
    {
        public DashboardPostgresContext(DbContextOptions<DashboardPostgresContext> options)
            : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Server> Servers { get; set; }
    }
}