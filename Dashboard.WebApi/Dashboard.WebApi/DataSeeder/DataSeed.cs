using Dashboard.WebApi.DataContext;
using Dashboard.WebApi.DomainModels;
using Dashboard.WebApi.Helpers;
using System.Collections.Generic;
using System.Linq;

namespace Dashboard.WebApi.DataSeeder
{
    public class DataSeed
    {
        private readonly DashboardPostgresContext _context;

        public DataSeed(DashboardPostgresContext context)
        {
            _context = context;
        }

     
        public void SeedData(int customersAmount, int ordersAmount)
        {
            if (!_context.Customers.Any())
            {
                SeedCustomers(customersAmount);
                _context.SaveChanges();
            }

            if (!_context.Orders.Any())
            {
                SeedOrders(ordersAmount);
                _context.SaveChanges();
            }

            if (!_context.Servers.Any())
            {
                SeedServers();
                _context.SaveChanges();
            }
        }


        private void SeedCustomers(int customersAmount)
        {
            var customers = BuildCustomerList(customersAmount);
            _context.Customers.AddRange(customers);
        }

        private void SeedOrders(int ordersAmount)
        {
            var orders = BuildOrderList(ordersAmount);
            _context.Orders.AddRange(orders);
        }

        private void SeedServers()
        {
            var servers = BuildServerList();
            _context.Servers.AddRange(servers);
        }

        private List<Customer> BuildCustomerList(int customersAmount)
        {
            var customers = new List<Customer>();

            for (var i = 1; i <= customersAmount; i++)
            {
                var name = DataSeedHelper.Current.MakeCustomerName();

                customers.Add(new Customer
                {
                    Id = i,
                    Name = name,
                    State = DataSeedHelper.Current.GetRandomState(),
                    Email = DataSeedHelper.Current.MakeCustomerEmail(name)
                });
            }

            return customers;
        }

        private List<Order> BuildOrderList(int ordersAmount)
        {
            var orders = new List<Order>();

            for (var i = 1; i <= ordersAmount; i++)
            {
                var placed = DataSeedHelper.Current.GetRandOrderPlaced();
                var completed = DataSeedHelper.Current.GetRandOrderCompleted(placed);

                orders.Add(new Order
                {
                    Id = i,
                    Customer = DataSeedHelper.Current.GetRandomCustomer(_context),
                    OrderTotal = DataSeedHelper.Current.GetRandomOrderTotal(),
                    Placed = placed,
                    Completed = completed
                });
            }

            return orders;
        }

        private List<Server> BuildServerList()
        {
            return DataSeedHelper.Current.GetServerList();
        }
    }
}
