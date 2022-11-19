using System.Data.SqlTypes;

namespace ExpenseStatistics.Models
{
    public class ProductPrice : BaseEntity
    {
        private Guid _productId;
        public Guid ProductId { get { return _productId; } set { _productId = value; } }

        private DateTime _date;
        public DateTime Date { get { return _date; } set { _date = value; } }

        private decimal _price;
        public decimal Price { get { return _price; } set { _price = value; } }
    }
}
