using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace web_agent_pro.Models
{
  public class Driver
  {
    public Driver()
        {
            Vehicles = new HashSet<Vehicle>();
        }

        public long Id { get; set; }
        public long QuoteId { get; set; }

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
        [DisplayName("Social Security Number")]
        [StringLength(9, MinimumLength = 9)]
        public string SSN { get; set; }

        [DisplayName("Attended Safe Driving School")]
        public bool SafeDrivingSchool { get; set; }
        public double? SafeDrivingSchoolDiscount { get; set; }

        [DisplayName("Driver Under 23 Years Old")]
        public bool Under23YearsOld { get; set; }

        public double? Under23YearsOldDiscount { get; set; }

        public decimal QuoteMultiplier { get; set; }

        public Quote Quote { get; set; }

        [Required]
        [DisplayName("Drivers License Number")]
        [MaxLength(20)]
        public string DriversLicenseNumber { get; set; }

        [Required]
        [DisplayName("Issuing State")]
        public string IssuingState { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
  }
}