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
        public IActionResult GetQuote([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var quote = await _context.Quotes.FindAsync(id);
            var quote = _context.Quotes.Where(q => q.Id == id)
                                       .Include(prop => prop.Drivers)
                                       .Include(prop => prop.Vehicles)
                                       .SingleOrDefault();

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

        [HttpGet("calculate")]
        public async Task<decimal> CalculateQuote(int quoteId)
        {
            Quote quote = _context.Quotes
                .Where(q => q.Id == quoteId)
                .Include(q => q.Drivers)
                .Include(q => q.Vehicles)
                .SingleOrDefault();

            decimal quotePrice = CalculateQuote(quote);
            quote.Price = quotePrice;

            _context.Quotes.Update(quote);
            await _context.SaveChangesAsync();

            return quote.Price;
        }

        private decimal CalculateQuote(Quote quote)
        {
            var vehicleSubtotalCost = 0m;
            var driverSubtotalCost = 0m;
            var SubmittedQuoteCost = 0m;
            List<Discount> discounts = _context.Discounts.Where(d => d.State == quote.State).ToList();
            foreach (var driver in quote.Drivers)
            {
                var driverCost = GetBaseDriverCost();
                driver.QuoteMultiplier = 1;
                if (driver.SafeDrivingSchool) driver.QuoteMultiplier *= GetSafeDrivingDiscount(quote, discounts);

                if (driver.DateOfBirth > DateTime.Now.AddYears(-23)) driver.QuoteMultiplier *= GetUnder23YearsOldDiscount(quote, discounts);
                driverCost *= driver.QuoteMultiplier;
                driverSubtotalCost += driverCost;

            }

            foreach (var vehicle in quote.Vehicles)
            {
                var vehicleCost = GetBaseVehicleCost(vehicle.CurrentValue);
                vehicle.QuoteMultiplier = 1;
                if (vehicle.AnnualMileage < 6000) vehicle.QuoteMultiplier *= GetAnnualMileage(quote, discounts);
                if (vehicle.AntilockBrakes) vehicle.QuoteMultiplier *= GetAntilockBrakes(quote, discounts);
                if (vehicle.AntiTheft) vehicle.QuoteMultiplier *= GetAntiTheft(quote, discounts);
                if (vehicle.DaysDrivenPerWeek > 4) vehicle.QuoteMultiplier *= GetDaysDriven(quote, discounts);
                if (vehicle.MilesToWork < 25) vehicle.QuoteMultiplier *= GetMilesDriven(quote, discounts);
                if (vehicle.DaytimeLights) vehicle.QuoteMultiplier *= GetDaytimeLights(quote, discounts);
                if (vehicle.NonResidenceGarage) vehicle.QuoteMultiplier *= GetGarage(quote, discounts);
                if (vehicle.PassiveRestraints) vehicle.QuoteMultiplier *= GetPR(quote, discounts);
                if (vehicle.ReducedUsed) vehicle.QuoteMultiplier *= GetRUD(quote, discounts);

                //TODO:
                var primaryOperator = quote.Drivers.Where(d => d.Id == vehicle.PrimaryDriverId).SingleOrDefault();
                if (primaryOperator != null) vehicle.QuoteMultiplier *= primaryOperator.QuoteMultiplier;

                vehicleCost *= vehicle.QuoteMultiplier;
                vehicleSubtotalCost += vehicleCost;
            }
            SubmittedQuoteCost = GetBaseSubmittedQuoteCost();
            quote.QuoteMultiplier = 1;
            SubmittedQuoteCost += driverSubtotalCost + vehicleSubtotalCost;
            if (quote.PastClaims) quote.QuoteMultiplier *= GetPastClaims(quote, discounts);
            if (quote.MultiCar || quote.Vehicles.Count > 1) quote.QuoteMultiplier *= GetMulticar(quote, discounts);
            if (quote.NewDriver) quote.QuoteMultiplier *= GetNewDriver(quote, discounts);
            if (quote.MovingViolations) quote.QuoteMultiplier *= GetMovingViolations(quote, discounts);
            if (quote.PreviousCarrierLizard) quote.QuoteMultiplier *= GetLizard(quote, discounts);
            if (quote.PreviousCarrierPervasive) quote.QuoteMultiplier *= GetPerv(quote, discounts);
            SubmittedQuoteCost *= quote.QuoteMultiplier;
            quote.Price = SubmittedQuoteCost;

            return SubmittedQuoteCost;

        }

        private bool QuoteExists(long id)
        {
            return _context.Quotes.Any(e => e.Id == id);
        }

        #region DISCOUNTS
        private decimal GetSafeDrivingDiscount(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("SafeDriver")).Amount;
        }

        private decimal GetUnder23YearsOldDiscount(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("YoungDriver")).Amount;
        }

        private decimal GetAnnualMileage(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("AnnualMilage")).Amount;
        }

        private decimal GetAntilockBrakes(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("AntilockBrakes")).Amount;
        }

        private decimal GetAntiTheft(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("AntiTheft")).Amount;
        }

        private decimal GetDaysDriven(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("DaysDriven")).Amount;
        }

        private decimal GetMilesDriven(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("MilesToWork")).Amount;
        }

        private decimal GetDaytimeLights(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("DaytimeLights")).Amount;
        }

        private decimal GetGarage(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("GarageDiffers")).Amount;
        }

        private decimal GetPR(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("PassiveRestraints")).Amount;
        }

        private decimal GetRUD(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("ReducedUsed")).Amount;
        }

        private decimal GetPastClaims(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("PastClaims")).Amount;
        }

        private decimal GetMulticar(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("MultiCar")).Amount;
        }

        private decimal GetNewDriver(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("NewDriver")).Amount;
        }

        private decimal GetMovingViolations(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("MovingViolations")).Amount;
        }

        private decimal GetLizard(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("PreviousCarrierLizard")).Amount;
        }

        private decimal GetPerv(Quote quote, List<Discount> discounts)
        {
            return 1 + (decimal)discounts.First(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("PreviousCarrierPervasive")).Amount;
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