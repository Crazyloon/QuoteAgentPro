using Microsoft.AspNetCore.Identity;
using web_agent_pro.Models.Enumerations;

namespace web_agent_pro.Models
{
  public class ApplicationUser : IdentityUser{
        // Extended Properties
        public AccountStatus AccountStatus { get; set; }
    }
}