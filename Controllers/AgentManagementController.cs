using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        private const string _manager = "Manager";
        private const string _agent = "Agent";

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
            return GetUsersByRole(_manager).ToList();
        }


        [HttpGet("agents")]
        public IEnumerable<ApplicationUser> GetAgents()
        {
            List<ApplicationUser> users = GetUsersByRole(_agent).ToList();
            return users;
            
        }

        [HttpGet("pending")]
        public IEnumerable<ApplicationUser> GetPendingUsers()
        {
            var pendingUsers = (from pu in _context.Users
                                where pu.AccountStatus == AccountStatus.Pending
                                select pu);

            return pendingUsers.ToList();
        }

        [HttpPut("agents/status")]
        public async Task<IActionResult> UpdateAgentStatusAll([FromBody] Dictionary<string, AccountStatus> agentStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = _context.Users;
            ApplicationUser user;
            foreach (var status in agentStatus) // key: AgentID, value: Enabled or Disabled
            {
                user = users.Where(u => u.Id == status.Key).SingleOrDefault();
                if(user != null)
                {
                    user.AccountStatus = status.Value;
                    _context.Entry(user).State = EntityState.Modified;
                }                
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                foreach (var status in agentStatus)
                {
                    if (!UserExists(status.Key))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return NoContent();
        }

        [HttpPut("agents/promote")]
        public async Task<Boolean> PromoteAgents([FromBody] Dictionary<string, AccessLevel> agents)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            var users = _context.Users;
            IdentityResult roleChangeResult = new IdentityResult();
            ApplicationUser user;
            foreach (var agent in agents)
            {
                user = users.Where(u => u.Id == agent.Key).SingleOrDefault();
                if(user != null)
                {
                    bool isAgent, isManager;
                    isAgent = await _userManager.IsInRoleAsync(user, _agent);
                    isManager = await _userManager.IsInRoleAsync(user, _manager);

                    if (isAgent)
                    {
                        var success = await _userManager.RemoveFromRoleAsync(user, _agent);
                    }
                    if (isManager)
                    {
                        var success = await _userManager.RemoveFromRoleAsync(user, _manager);
                    }

                    string role = (agent.Value == AccessLevel.Manager) ? _manager : _agent;
                    roleChangeResult = await _userManager.AddToRoleAsync(user, role);
                }
            }

            return roleChangeResult.Succeeded;
        }

        [HttpPut("agents/activate")]
        public async Task<Boolean> ActivatePendingUsers([FromBody] string[] pendingUserIds)
        {
            if (!ModelState.IsValid)
            {
                return false;
            }

            var users = _context.Users;
            IdentityResult activateResult = new IdentityResult();
            ApplicationUser user;
            foreach (string userId in pendingUserIds)
            {
                user = users.Where(u => u.Id == userId).SingleOrDefault();
                if(user != null)
                {
                    user.AccountStatus = AccountStatus.Enabled;
                    _context.Entry(user).State = EntityState.Modified;
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                foreach (var userId in pendingUserIds)
                {
                    if (!UserExists(userId))
                    {
                        return false;
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return true;
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