using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web_agent_pro.Models;

namespace web_agent_pro.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(WebAgentProDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            IdentityUser russ = await userManager.FindByEmailAsync("russdow1@gmail.com");
            if (russ == null || russ.Email != "russdow1@gmail.com")
            {
                ApplicationUser user = new ApplicationUser
                {
                    UserName = "russdow1@gmail.com",
                    Email = "russdow1@gmail.com"
                };
                IdentityResult userResult = await userManager.CreateAsync(user, "pa55word");

                if (userResult.Succeeded)
                {
                    IdentityRole role = new IdentityRole("Manager");
                    IdentityResult roleResult = await roleManager.CreateAsync(role);
                    if (roleResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Manager");
                    }
                }
            }

            Quote quote = new Quote(){
                Address = "21818 123rd st s",
                City = "Burlington",
                DateOfBirth = new DateTime(1998, 12, 1),
                DateQuoted = DateTime.Now,
                Email = "bburns@mail.com",
                FirstName = "Bob",
                LastName = "Bridge",
                MovingViolations = false,
                MultiCar = false,
                NewDriver = false,
                PastClaims = false,
                Phone = "8184174414",
                PreviousCarrier = "Lizard",
                PreviousCarrierLizard = true,
                PreviousCarrierLizardDiscount = -0.15,
                PreviousCarrierPervasive = false,
                SSN = "123456789",
                State = "VT",
                Submitted = false,
                UserId = russ.Id,
                Zip = "31844"
            };
            context.Quotes.Add(quote);
            context.SaveChanges();
            
            Driver driver = new Driver(){
                DateOfBirth = quote.DateOfBirth,
                DriversLicenseNumber = "bburns**321NN",
                FirstName = quote.FirstName,
                IssuingState = "VT",
                LastName = quote.LastName,
                QuoteId = quote.Id,
                SafeDrivingSchool = true,
                SafeDrivingSchoolDiscount = -0.05,
                SSN = quote.SSN,
                Under23YearsOld = false,
            };
            context.Drivers.Add(driver);

            driver = new Driver(){
                DateOfBirth = new DateTime(1997, 4, 18),
                DriversLicenseNumber = "bburns**321NN",
                FirstName = "James",
                IssuingState = "VT",
                LastName = "Burns",
                QuoteId = quote.Id,
                SafeDrivingSchool = true,
                SafeDrivingSchoolDiscount = -0.05,
                SSN = "123451232",
                Under23YearsOld = true,
            };
            context.Drivers.Add(driver);
            context.SaveChanges();

            quote = new Quote(){
                Address = "14818 1st ave n",
                City = "Burmingham",
                DateOfBirth = new DateTime(1990, 11, 17),
                DateQuoted = DateTime.Now,
                Email = "sseren@mail.com",
                FirstName = "Sara",
                LastName = "Seren",
                MovingViolations = false,
                MultiCar = false,
                NewDriver = false,
                PastClaims = false,
                Phone = "8182214412",
                PreviousCarrier = "Pervasive",
                PreviousCarrierLizard = false,
                PreviousCarrierPervasive = true,
                PreviousCarrierPervasiveDiscount = -0.15,
                SSN = "123567901",
                State = "VT",
                Submitted = false,
                UserId = russ.Id,
                Zip = "31844"
            };
            context.Quotes.Add(quote);
            context.SaveChanges();

            quote = new Quote(){
                Address = "21818 2nd ave s",
                City = "Veneril",
                DateOfBirth = new DateTime(1990, 11, 17),
                DateQuoted = DateTime.Now,
                Email = "gcarson@mail.com",
                FirstName = "Guy",
                LastName = "Carson",
                MovingViolations = true,
                MovingViolationsDiscount = 0.15,
                MultiCar = false,
                NewDriver = false,
                PastClaims = true,
                PastClaimsDiscount = 0.05,
                Phone = "849473821",
                PreviousCarrier = "Other",
                PreviousCarrierLizard = false,
                PreviousCarrierPervasive = false,
                SSN = "122567221",
                State = "VT",
                Submitted = false,
                UserId = russ.Id,
                Zip = "31824"
            };
            context.Quotes.Add(quote);
            context.SaveChanges();

            driver = new Driver(){
                DateOfBirth = new DateTime(1990, 11, 17),
                DriversLicenseNumber = "GCAR**321NN",
                FirstName = quote.FirstName,
                IssuingState = "VT",
                LastName = quote.LastName,
                QuoteId = quote.Id,
                SafeDrivingSchool = true,
                SafeDrivingSchoolDiscount = -0.05,
                SSN = quote.SSN,
                Under23YearsOld = false,
            };
            context.Drivers.Add(driver);
            context.SaveChanges();            
            
        }

        private static async void InitializeQuoteDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<WebAgentProDbContext>();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();

                await DbInitializer.Initialize(context, userManager, roleManager);
            }
        }
    }
}
