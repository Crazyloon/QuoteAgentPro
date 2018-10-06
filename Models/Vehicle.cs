using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace web_agent_pro.Models
{
  public partial class Vehicle
  {
    public long Id { get; set; }

    public long QuoteId { get; set; }

    [DisplayName("Primary Driver")]
    public long? PrimaryDriverId { get; set; }

    [Required]
    [DisplayName("VIN")]
    [StringLength(17, MinimumLength = 17)]
    public string Vin { get; set; }

    [Required]
    [MaxLength(20)]
    public string Make { get; set; }

    [Required]
    [MaxLength(25)]
    public string Model { get; set; }

    [Required]
    public short Year { get; set; }

    [Required]
    [DisplayName("Current Value")]
    public decimal CurrentValue { get; set; }

    [Range(1, 300)]
    [DisplayName("Miles To Work")]
    public int? MilesToWork { get; set; }

    [DisplayName("Anti-theft")]
    public bool AntiTheft { get; set; }

    public double? AntiTheftDiscount { get; set; }

    [DisplayName("Antilock Brakes")]
    public bool AntilockBrakes { get; set; }

    public double? AntilockBrakesDiscount { get; set; }

    [DisplayName("Daytime Running Lights")]
    public bool DaytimeLights { get; set; }

    public double? DaytimeLightsDiscount { get; set; }

    [DisplayName("Residence Differs From Garage")]
    public bool NonResidenceGarage { get; set; }

    public double? NonResidenceGarageDiscount { get; set; }

    [DisplayName("Passive Restraints")]
    public bool PassiveRestraints { get; set; }

    public double? PassiveRestraintsDiscount { get; set; }

    [DisplayName("Reduced Used Discount")]
    public bool ReducedUsed { get; set; }

    public double? ReducedUsedDiscount { get; set; }

    [Required]
    [DisplayName("Annual Mileage")]
    public int? AnnualMileage { get; set; }

    [DisplayName("Annual Mileage Under 6k")]
    public bool AnnualMileageUnder6k { get; set; }

    public double? AnnualMileageDiscount { get; set; }

    [Required]
    [Range(1, 7)]
    [DisplayName("Days Driven Per Week")]
    public byte DaysDrivenPerWeek { get; set; }

    [DisplayName("Days Driven Per Week Over 4")]
    public bool DaysDrivenPerWeekOver4 { get; set; }

    public double? DaysDrivenPerWeekOver4Discount { get; set; }

    [DisplayName("Miles To Work Under 26")]
    public bool MilesToWorkUnder26 { get; set; }

    public double? MilesToWorkUnder26Discount { get; set; }

    public decimal QuoteMultiplier { get; set; }

    public Driver PrimaryDriver { get; set; }

    public Quote Quote { get; set; }
  }
}
