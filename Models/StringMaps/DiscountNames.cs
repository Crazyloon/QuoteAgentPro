using System.Collections.Generic;

namespace web_agent_pro.Models.StringMaps
{
    public class DiscountNames
    {
        public Dictionary<string, string> NamesMap { get; }
        public DiscountNames()
        {
            this.NamesMap = new Dictionary<string, string>();
            NamesMap.Add("MovingViolations", "Moving Violation in last 5 years");
            NamesMap.Add("MultiCar", "Multi-car discount");
            NamesMap.Add("NewDriver", "Customer less than 3 years driving");
            NamesMap.Add("PastClaims", "Claim in last 5 years");
            NamesMap.Add("PreviousCarrierLizard", "Previous carrier is Lizard Ins");
            NamesMap.Add("PreviousCarrierPervasive", "Previous carrier is Pervasive State Ins");
        }



    }
}