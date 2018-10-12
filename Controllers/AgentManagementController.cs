using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_agent_pro.Data;
using web_agent_pro.Models;
using web_agent_pro.Models.Enumerations;

namespace web_agent_pro.Controllers
{
    [Produces("application/json")]
    [Route("api/management")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Manager")]
    public class AgentManagementController : ControllerBase
    {
        private readonly WebAgentProDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AgentManagementController(WebAgentProDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/management
        [HttpGet]
        public IEnumerable<ApplicationUser> GetUsers()
        {
            return _context.Users;
        }

        [HttpGet("managers")]
        public IEnumerable<ApplicationUser> GetManagers()
        {
            return GetUsersByRole("Manager").ToList();
        }


        [HttpGet("agents")]
        public IEnumerable<ApplicationUser> GetAgents()
        {
            return GetUsersByRole("Agent").ToList();
            
        }

        [HttpGet("pending")]
        public IEnumerable<ApplicationUser> GetPendingUsers()
        {
            var pendingUsers = (from pu in _context.Users
                                where pu.AccountStatus == AccountStatus.Pending
                                select pu);

            return pendingUsers.ToList();
        }

        /// <summary>
        /// Gets all non-pending users in the provided role
        /// </summary>
        /// <param name="role">The users role within the company. Like Agent or Manager</param>
        /// <returns>An IQueryable of non-pending users in the provided role.</returns>
        private IQueryable<ApplicationUser> GetUsersByRole(string role)
        {
            return (from u in _context.Users
                    join r in _context.UserRoles on u.Id equals r.UserId
                    join ur in _context.Roles on r.RoleId equals ur.Id
                    where ur.Name == role && u.AccountStatus != AccountStatus.Pending
                    select u);
        }

        /// <summary>
        /// Gets all users with a given status in the provided role
        /// </summary>
        /// <param name="role">The users role within the company. Like Agent or Manager</param>
        /// <param name="status">The AccountStatus of the desired ApplicationUsers</param>
        /// <returns>An IQueryable of users with a given status in the provided role.</returns>
        private IQueryable<ApplicationUser> GetUsersByRole(string role, AccountStatus status)
        {
            return (from u in _context.Users
                    join r in _context.UserRoles on u.Id equals r.UserId
                    join ur in _context.Roles on r.RoleId equals ur.Id
                    where ur.Name == role && u.AccountStatus == status
                    select u);
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}