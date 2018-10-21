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
            IdentityUser jane = await userManager.FindByEmailAsync("janedoe@mail.com");
            if (jane == null || jane.Email != "janedoe@email.com")
            {
                ApplicationUser user = new ApplicationUser
                {
                    UserName = "janedoe@email.com",
                    Email = "janedoe@email.com"
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
