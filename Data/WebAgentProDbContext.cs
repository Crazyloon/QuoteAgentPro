using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using web_agent_pro.Models;

namespace web_agent_pro.Data
{
    public class WebAgentProDbContext : IdentityDbContext<ApplicationUser>
    {
        public WebAgentProDbContext(DbContextOptions<WebAgentProDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
    }
}