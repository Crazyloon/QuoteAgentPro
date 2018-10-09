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
using web_agent_pro.Models.RouteQueries;
using web_agent_pro.Models.StringMaps;

namespace web_agent_pro.Controllers
{
    [Produces("application/json")]
    [Route("api/quotes")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class QuotesController : ControllerBase
    {
        private readonly WebAgentProDbContext _context;
        private DiscountNames _discountNames;
        private readonly UserManager<ApplicationUser> _userManager;

        public QuotesController(WebAgentProDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            _discountNames = new DiscountNames();
        }

        // GET: api/Quotes
        [HttpGet]
        public IEnumerable<Quote> GetQuotes([FromQuery] CurrentUser query)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == query.UserId);
            return _context.Quotes.Where(q => q.UserId == user.Id);
        }

        // GET: api/Quotes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuote([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quote = await _context.Quotes.FindAsync(id);

            if (quote == null)
            {
                return NotFound();
            }

            return Ok(quote);
        }

        // PUT: api/Quotes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuote([FromRoute] long id, [FromBody] Quote quote)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != quote.Id)
            {
                return BadRequest();
            }

            _context.Entry(quote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuoteExists(id))
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

        // POST: api/Quotes
        [HttpPost]
        public async Task<IActionResult> PostQuote([FromBody] Quote quote)
        {



            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // apply quote discounts
            // BEGIN EXTRACT METHOD
            List<Discount> quoteDiscounts = _context.Discounts.Where(d => d.Scope == "Quote" && d.State == quote.State).ToList();
            if(quote.PastClaims)
            {
                quote.PastClaimsDiscount = quoteDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("PastClaims")).SingleOrDefault().Amount;
            }
            if(quote.NewDriver)
            {
                quote.NewDriverDiscount = quoteDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("NewDriver")).SingleOrDefault().Amount;
            }
            if(quote.MovingViolations) 
            {
                quote.MovingViolationsDiscount = quoteDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("MovingViolations")).SingleOrDefault().Amount;
            }
            if(quote.MultiCar)
            {
                quote.MultiCarDiscount = quoteDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("MultiCar")).SingleOrDefault().Amount;
            }
            if(quote.PreviousCarrierLizard)
            {
                quote.PreviousCarrierLizardDiscount = quoteDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("PreviousCarrierLizard")).SingleOrDefault().Amount;
            }
            if(quote.PreviousCarrierPervasive)
            {
                quote.PreviousCarrierPervasiveDiscount = quoteDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("PreviousCarrierPervasive")).SingleOrDefault().Amount;
            }
            // END EXTRACT METHOD
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuote", new { id = quote.Id }, quote);
        }

        // DELETE: api/Quotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null)
            {
                return NotFound();
            }

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return Ok(quote);
        }

        public decimal CalculateQuote(int quoteId)
        {
            Quote quote = _context.Quotes
                .Where(q => q.Id == quoteId)
                .Include(q => q.Drivers)
                .Include(q => q.Vehicles)
                .SingleOrDefault();

            return CalculateQuote(quote);
        }

        private decimal CalculateQuote(Quote quote)
        {
            var vehicleSubtotalCost = 0m;
            var driverSubtotalCost = 0m;
            var SubmittedQuoteCost = 0m;
            foreach (var driver in quote.Drivers)
            {
                var driverCost = GetBaseDriverCost();
                driver.QuoteMultiplier = 1;
                if (driver.SafeDrivingSchool) driver.QuoteMultiplier *= GetSafeDrivingDiscount(quote);

                if (driver.DateOfBirth > DateTime.Now.AddYears(-23)) driver.QuoteMultiplier *= GetUnder23YearsOldDiscount(quote);
                driverCost *= driver.QuoteMultiplier;
                driverSubtotalCost += driverCost;

            }

            foreach (var vehicle in quote.Vehicles)
            {
                var vehicleCost = GetBaseVehicleCost(vehicle.CurrentValue);
                vehicle.QuoteMultiplier = 1;
                if (vehicle.AnnualMileage < 6000) vehicle.QuoteMultiplier *= GetAnnualMileage(quote);
                if (vehicle.AntilockBrakes) vehicle.QuoteMultiplier *= GetAntilockBrakes(quote);
                if (vehicle.AntiTheft) vehicle.QuoteMultiplier *= GetAntiTheft(quote);
                if (vehicle.DaysDrivenPerWeek > 4) vehicle.QuoteMultiplier *= GetDaysDriven(quote);
                if (vehicle.MilesToWork < 25) vehicle.QuoteMultiplier *= GetMilesDriven(quote);
                if (vehicle.DaytimeLights) vehicle.QuoteMultiplier *= GetDaytimeLights(quote);
                if (vehicle.NonResidenceGarage) vehicle.QuoteMultiplier *= GetGarage(quote);
                if (vehicle.PassiveRestraints) vehicle.QuoteMultiplier *= GetPR(quote);
                if (vehicle.ReducedUsed) vehicle.QuoteMultiplier *= GetRUD(quote);

                //TODO:
                var primaryOperator = quote.Drivers.Where(d => d.Id == vehicle.PrimaryDriverId).SingleOrDefault();
                if (primaryOperator != null) vehicle.QuoteMultiplier *= primaryOperator.QuoteMultiplier;

                vehicleCost *= vehicle.QuoteMultiplier;
                vehicleSubtotalCost += vehicleCost;
            }
            SubmittedQuoteCost = GetBaseSubmittedQuoteCost();
            quote.QuoteMultiplier = 1;
            SubmittedQuoteCost += driverSubtotalCost + vehicleSubtotalCost;
            if (quote.PastClaims) quote.QuoteMultiplier *= GetPastClaims(quote);
            if (quote.MultiCar || quote.Vehicles.Count > 1) quote.QuoteMultiplier *= GetMulticar(quote);
            if (quote.NewDriver) quote.QuoteMultiplier *= GetNewDriver(quote);
            if (quote.MovingViolations) quote.QuoteMultiplier *= GetMovingViolations(quote);
            if (quote.PreviousCarrierLizard) quote.QuoteMultiplier *= GetLizard(quote);
            if (quote.PreviousCarrierPervasive) quote.QuoteMultiplier *= GetPerv(quote);
            SubmittedQuoteCost *= quote.QuoteMultiplier;
            quote.Price = SubmittedQuoteCost;

            return SubmittedQuoteCost;

        }

        private bool QuoteExists(long id)
        {
            return _context.Quotes.Any(e => e.Id == id);
        }

        #region DISCOUNTS
        private decimal GetSafeDrivingDiscount(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Attended Safe Driving School" && d.State == quote.State).Amount;
        }

        private decimal GetUnder23YearsOldDiscount(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "A driver less than 23 years old" && d.State == quote.State).Amount;
        }

        private decimal GetAnnualMileage(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Annual mileage < 6000" && d.State == quote.State).Amount;
        }

        private decimal GetAntilockBrakes(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Antilock Brakes" && d.State == quote.State).Amount;
        }

        private decimal GetAntiTheft(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Anti-theft Installed" && d.State == quote.State).Amount;
        }

        private decimal GetDaysDriven(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Days driven per week > 4" && d.State == quote.State).Amount;
        }

        private decimal GetMilesDriven(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Miles driven to work <= 25" && d.State == quote.State).Amount;
        }

        private decimal GetDaytimeLights(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Daytime Running Lights" && d.State == quote.State).Amount;
        }

        private decimal GetGarage(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Garage address different from Residence" && d.State == quote.State).Amount;
        }

        private decimal GetPR(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Passive Restraints" && d.State == quote.State).Amount;
        }

        private decimal GetRUD(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Reduce Use Discounts" && d.State == quote.State).Amount;
        }

        private decimal GetPastClaims(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Claim in last 5 years" && d.State == quote.State).Amount;
        }

        private decimal GetMulticar(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Multi-car discount" && d.State == quote.State).Amount;
        }

        private decimal GetNewDriver(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Customer less than 3 years driving" && d.State == quote.State).Amount;
        }

        private decimal GetMovingViolations(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Moving Violation in last 5 years" && d.State == quote.State).Amount;
        }

        private decimal GetLizard(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Previous carrier is Lizard Ins" && d.State == quote.State).Amount;
        }

        private decimal GetPerv(Quote quote)
        {
            return 1 + (decimal)_context.Discounts.First(d => d.Name == "Previous carrier is Pervasive State Ins" && d.State == quote.State).Amount;
        }

        private decimal GetBaseSubmittedQuoteCost()
        {
            return 100m;
        }

        private decimal GetBaseVehicleCost(decimal currentValue)
        {
            return currentValue * .03m;
        }

        private decimal GetBaseDriverCost()
        {
            return 200m;
        }
        #endregion
    }
}