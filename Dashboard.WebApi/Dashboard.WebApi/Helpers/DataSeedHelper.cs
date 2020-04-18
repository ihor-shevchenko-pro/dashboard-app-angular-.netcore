using Dashboard.WebApi.DataContext;
using Dashboard.WebApi.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Dashboard.WebApi.Helpers
{
    public class DataSeedHelper
    {
        private static readonly DataSeedHelper _instance = new DataSeedHelper();
        public static DataSeedHelper Current => _instance;
        private Random _rand = new Random();

        private DataSeedHelper()
        {
        }

        private readonly List<string> states = new List<string>()
        {
            "AK", "AL","AZ",  "AR", "CA", "CO", "CT", "DE", "FL", "GA",
            "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
            "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
            "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
            "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
        };

        private readonly List<string> bizPrefixes = new List<string>()
        {
            "ABC",
            "XYZ",
            "Acme",
            "MainSt",
            "Ready",
            "Magic",
            "Fluent",
            "Peak",
            "Forward",
            "Enterprise",
            "Sales"
        };

        private readonly List<string> bizSuffixes = new List<string>()
        {
            "Co",
            "Corp",
            "Holdings",
            "Corporation",
            "Movers",
            "Cleaners",
            "Bakery",
            "Apparel",
            "Rentals",
            "Storage",
            "Transit",
            "Logistics"
        };

        private readonly List<Server> servers = new List<Server>()
        {
            new Server
            {
                Id = 1,
                Name = "Dev-Web",
                IsOnline = true
            },

            new Server
            {
                Id = 2,
                Name = "Dev-Analysis",
                IsOnline = true
            },

            new Server
            {
                Id = 3,
                Name = "Dev-Mail",
                IsOnline = true
            },

            new Server
            {
                Id = 4,
                Name = "QA-Web",
                IsOnline = true
            },

            new Server
            {
                Id = 5,
                Name = "QA-Analysis",
                IsOnline = true
            },

            new Server
            {
                Id = 6,
                Name = "QA-Mail",
                IsOnline = true
            },
            
            new Server
            {
                Id = 7,
                Name = "Prod-Web",
                IsOnline = true
            },

            new Server
            {
                Id = 8,
                Name = "Prod-Analysis",
                IsOnline = true
            },

            new Server
            {
                Id = 9,
                Name = "Prod-Mail",
                IsOnline = true
            },
        };


        public string MakeCustomerName()
        {
            var prefix = GetRandomItem(bizPrefixes);
            var suffix = GetRandomItem(bizSuffixes);
            return prefix + suffix;
        }

        public string MakeCustomerEmail(string name)
        {
            return $"contact@{name.ToLower()}_{DateTime.Now:fff}.com";
        }

        public string GetRandomState()
        {
            return GetRandomItem(states);
        }

        public DateTime GetRandOrderPlaced()
        {
            var end = DateTime.Now;
            var start = end.AddDays(-90);

            TimeSpan possibleSpan = end - start;
            TimeSpan newSpan = new TimeSpan(0, _rand.Next(0, (int)possibleSpan.TotalMinutes), 0);

            return start + newSpan;
        }

        public DateTime? GetRandOrderCompleted(DateTime placed)
        {
            var now = DateTime.Now;
            var minLeadTime = TimeSpan.FromDays(7);
            var timePassed = now - placed;

            if (timePassed < minLeadTime)
            {
                return null;
            }

            return placed.AddHours(_rand.Next(10, 90));
        }

        public Customer GetRandomCustomer(DashboardPostgresContext context)
        {
            var randomId = _rand.Next(1, context.Customers.Count());
            return context.Customers.First(c => c.Id == randomId);
        }

        public decimal GetRandomOrderTotal()
        {
            return _rand.Next(25, 1000);
        }

        public List<Server> GetServerList()
        {
            return servers;
        }

        private string GetRandomItem(IList<string> items)
        {
            return items[_rand.Next(items.Count)];
        }
    }
}
