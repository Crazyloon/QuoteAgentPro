using Microsoft.AspNetCore.Identity;
using System;
using web_agent_pro.Models.Enumerations;

namespace web_agent_pro.Models
{
  public class ApplicationUser : IdentityUser{
        // Extended Properties
        public AccountStatus AccountStatus { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}