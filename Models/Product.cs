namespace ExpenseStatistics.Models
{
    public class Product : BaseEntity
    {
        private string _name;
        public string Name { get { return _name; } set { _name = value; } }
    }
}
