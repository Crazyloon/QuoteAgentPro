using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace web_agent_pro.Models
{
    public class Quote 
    {
      public Quote()
        {
            Drivers = new HashSet<Driver>();
            Vehicles = new HashSet<Vehicle>();
        }

        [DisplayName("Quote ID")]
        public long Id { get; set; }

        [Required]
        [DisplayName("User Id")]
        [MaxLength(450)]
        public string UserId { get; set; }
        
        [Required]
        [DisplayName("First Name")]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [DisplayName("Last Name")]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [DisplayName("Date of Birth")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Email { get; set; }

        public string Phone { get; set; }

        [Required]
        [MaxLength(40)]
        public string Address { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        [StringLength(5, MinimumLength = 5)]
        public string Zip { get; set; }

        [Required]
        [DisplayName("Social Security Number")]
        [StringLength(9, MinimumLength = 9)]
        public string SSN { get; set; }

        [Required]
        [DisplayName("Previous Carrier")]
        public string PreviousCarrier { get; set; }

        [DisplayName("Claims in last 5 years")]
        public bool PastClaims { get; set; }

        public double? PastClaimsDiscount { get; set; }

        [DisplayName("Any moving violation in last 5 years")]
        public bool MovingViolations { get; set; }

        public double? MovingViolationsDiscount { get; set; }

        [DisplayName("Less than 3 years driving")]
        public bool NewDriver { get; set; }

        [DisplayName("New Driver Discount")]
        public double? NewDriverDiscount { get; set; }

        [DisplayName("Force multi-car discount")]
        public bool MultiCar { get; set; }

        [DisplayName("Multi-car Discount")]
        public double? MultiCarDiscount { get; set; }

        [DisplayName("Previous Carrier is Lizard")]
        public bool PreviousCarrierLizard { get; set; }

        public double? PreviousCarrierLizardDiscount { get; set; }

        [DisplayName("Previous Carrier is Pervasive")]
        public bool PreviousCarrierPervasive { get; set; }

        public double? PreviousCarrierPervasiveDiscount { get; set; }

        [DisplayName("Price")]
        public decimal Price { get; set; }

        [DisplayName("Date Quoted")]
        public DateTime DateQuoted { get; set; }

        [DisplayName("Submitted?")]
        public bool Submitted { get; set; }

        [DisplayName("Date Sold")]
        public DateTime? DateSold { get; set; }

        [DisplayName("Discarded")]
        public bool Discarded { get; set; }

        [DisplayName("Date Discarded")]
        public DateTime? DateDiscarded { get; set; }
        public decimal QuoteMultiplier { get; set; }

        public virtual ApplicationUser User { get; set; }
        
        public ICollection<Driver> Drivers { get; set; }

        public ICollection<Vehicle> Vehicles { get; set; }
    }
}
