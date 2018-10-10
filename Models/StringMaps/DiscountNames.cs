using System.Collections.Generic;

namespace web_agent_pro.Models.StringMaps
{
    public class DiscountNames
    {
        public Dictionary<string, string> NamesMap { get; }
        public DiscountNames()
        {
            this.NamesMap = new Dictionary<string, string>();
            // QUOTE DISCOUNTS:
            NamesMap.Add("MovingViolations", "Moving Violation in last 5 years");
            NamesMap.Add("MultiCar", "Multi-car discount");
            NamesMap.Add("NewDriver", "Customer less than 3 years driving");
            NamesMap.Add("PastClaims", "Claim in last 5 years");
            NamesMap.Add("PreviousCarrierLizard", "Previous carrier is Lizard Ins");
            NamesMap.Add("PreviousCarrierPervasive", "Previous carrier is Pervasive Ins");
            // DRIVER DISCOUNTS:
            NamesMap.Add("YoungDriver", "A driver less than 23 years old");
            NamesMap.Add("SafeDriver", "Attended Safe Driving School");
            // VEHICLE DISCOUNTS:
            NamesMap.Add("DaytimeLights", "Daytime Running Lights");
            NamesMap.Add("AntilockBrakes", "Antilock Brakes");
            NamesMap.Add("AnnualMilage", "Annual mileage < 6000");
            NamesMap.Add("PassiveRestraints", "Passive Restraints");
            NamesMap.Add("AntiTheft", "Anti-theft Installed");
            NamesMap.Add("DaysDriven", "Days driven per week > 4");
            NamesMap.Add("MilesToWork", "Miles driven to work <= 25");
            NamesMap.Add("ReducedUsed", "Reduce Use Discount");
            NamesMap.Add("GarageDiffers", "Garage address different from Residence");
        }



    }
}