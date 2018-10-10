using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_agent_pro.Data;
using web_agent_pro.Models;
using web_agent_pro.Models.StringMaps;

namespace web_agent_pro.Controllers
{
    [Produces("application/json")]
    [Route("api/drivers")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DriversController : ControllerBase
    {
        private readonly WebAgentProDbContext _context;
        private DiscountNames _discountNames;

        public DriversController(WebAgentProDbContext context)
        {
            _context = context;
            _discountNames = new DiscountNames();
        }

        // GET: api/Drivers
        [HttpGet]
        public IEnumerable<Driver> GetDrivers()
        {
            return _context.Drivers;
        }

        // GET: api/Drivers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDriver([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var driver = await _context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }

            return Ok(driver);
        }

        // PUT: api/Drivers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriver([FromRoute] long id, [FromBody] Driver driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != driver.Id)
            {
                return BadRequest();
            }

            _context.Entry(driver).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Drivers
        [HttpPost]
        public async Task<IActionResult> PostDriver([FromBody] Driver driver)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // TODO: Protect against States that aren't in the database (Causes NullReferenceException on '.Amount' below)
            List<Discount> driverDiscounts = _context.Discounts.Where(d => d.Scope == "Person" && d.State == driver.IssuingState).ToList();
            if(driver.SafeDrivingSchool)
            {
                driver.SafeDrivingSchoolDiscount = driverDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("SafeDriver")).SingleOrDefault().Amount;
            }
            if(driver.Under23YearsOld)
            {
                driver.Under23YearsOldDiscount = driverDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("YoungDriver")).SingleOrDefault().Amount;
            }

            _context.Drivers.Add(driver);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDriver", new { id = driver.Id }, driver);
        }

        // DELETE: api/Drivers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();

            return Ok(driver);
        }

        private bool DriverExists(long id)
        {
            return _context.Drivers.Any(e => e.Id == id);
        }
    }
}