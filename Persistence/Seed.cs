using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title="Past Actitivty 1",
                        Date=DateTime.Now.AddMonths(2),
                        Description="Activity in 2 months",
                        Category="Drink",
                        City="New york",
                        Venue="Time square"
                    },
                    new Activity
                    {
                        Title="Past Actitivty 12",
                        Date=DateTime.Now.AddMonths(4),
                        Description="Activity in 4 months",
                        Category="Sport",
                        City="London",
                        Venue="Lords cricket ground"
                    },
                    new Activity
                    {
                        Title="Past Actitivty 12",
                        Date=DateTime.Now.AddMonths(4),
                        Description="Activity in 4 months",
                        Category="Sport",
                        City="London",
                        Venue="Lords cricket ground"
                    }
                };
                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}