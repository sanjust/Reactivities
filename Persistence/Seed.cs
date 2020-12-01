using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName="Bob",
                        UserName="bob",
                        Email="bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName="Tom",
                        UserName="tim",
                        Email="tom@test.com"
                    },
                     new AppUser
                    {
                        DisplayName="Jane",
                        UserName="jane",
                        Email="jane@test.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

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