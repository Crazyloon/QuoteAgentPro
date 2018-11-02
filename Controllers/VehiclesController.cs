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
    [Route("api/vehicles")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VehiclesController : ControllerBase
    {
        private readonly WebAgentProDbContext _context;
        private DiscountNames _discountNames;

        public VehiclesController(WebAgentProDbContext context)
        {
            _context = context;
            _discountNames = new DiscountNames();
        }

        // GET: api/Vehicles
        [HttpGet]
        public IEnumerable<Vehicle> GetVehicles()
        {
            return _context.Vehicles;
        }

        // GET: api/Vehicles/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await _context.Vehicles.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        // PUT: api/Vehicles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle([FromRoute] long id, [FromBody] Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.Id)
            {
                return BadRequest();
            }

            SetDiscounts(vehicle);

            _context.Vehicles.Update(vehicle);
            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(vehicle);
        }

        [HttpPut("updatemany")]
        public async Task<IActionResult> PutVehicles([FromBody] Vehicle[] vehicles)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Vehicles.UpdateRange(vehicles);
            foreach (var v in vehicles)
            {
                _context.Entry(v).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                foreach (var v in vehicles)
                {
                    if (!VehicleExists(v.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                throw;
            }

            return Ok(vehicles);
        }

        // POST: api/Vehicles
        [HttpPost]
        public async Task<IActionResult> PostVehicle([FromBody] Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            SetDiscounts(vehicle);

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVehicle", new { id = vehicle.Id }, vehicle);
        }

        private void SetDiscounts(Vehicle vehicle)
        {
            var relatedQuote = _context.Quotes.Where(q => q.Id == vehicle.QuoteId).SingleOrDefault();
            List<Discount> vehicleDiscounts = _context.Discounts.Where(d => d.Scope == "Vehicle" && d.State == relatedQuote.State).ToList();
            if (vehicleDiscounts.Count > 0)
            {
                if (vehicle.AnnualMileageUnder6k)
                {
                    vehicle.AnnualMileageDiscount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("AnnualMilage")).SingleOrDefault().Amount;
                }
                if (vehicle.AntilockBrakes)
                {
                    vehicle.AntilockBrakesDiscount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("AntilockBrakes")).SingleOrDefault().Amount;
                }
                if (vehicle.AntiTheft)
                {
                    vehicle.AntiTheftDiscount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("AntiTheft")).SingleOrDefault().Amount;
                }
                if (vehicle.DaysDrivenPerWeekOver4)
                {
                    vehicle.DaysDrivenPerWeekOver4Discount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("DaysDriven")).SingleOrDefault().Amount;
                }
                if (vehicle.DaytimeLights)
                {
                    vehicle.DaytimeLightsDiscount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("DaytimeLights")).SingleOrDefault().Amount;
                }
                if (vehicle.MilesToWorkUnder26)
                {
                    vehicle.MilesToWorkUnder26Discount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("MilesToWork")).SingleOrDefault().Amount;
                }
                if (vehicle.NonResidenceGarage)
                {
                    vehicle.NonResidenceGarageDiscount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("GarageDiffers")).SingleOrDefault().Amount;
                }
                if (vehicle.PassiveRestraints)
                {
                    vehicle.PassiveRestraintsDiscount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("PassiveRestraints")).SingleOrDefault().Amount;
                }
                if (vehicle.ReducedUsed)
                {
                    vehicle.ReducedUsedDiscount = vehicleDiscounts.Where(d => d.Name == _discountNames.NamesMap.GetValueOrDefault("ReducedUsed")).SingleOrDefault().Amount;
                }
            }
        }

        // DELETE: api/Vehicles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return Ok(vehicle);
        }

        private bool VehicleExists(long id)
        {
            return _context.Vehicles.Any(e => e.Id == id);
        }
    }
}