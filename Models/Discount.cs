namespace web_agent_pro.Models
{
    public partial class Discount
    {
        public long DiscountId { get; set; }
        public string Name { get; set; }
        public string Scope { get; set; }
        public double Amount { get; set; }
        public string State { get; set; }
    }
}