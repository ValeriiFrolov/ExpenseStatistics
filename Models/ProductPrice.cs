using System.Data.SqlTypes;

namespace ExpenseStatistics.Models
{
    public class ProductPrice : BaseEntity
    {
        private Product _product;
        public Product Product { get { return _product; } set { _product = value; } }

        private DateTime _date;
        public DateTime Date { get { return _date; } set { _date = value; } }

        private decimal _price;
        public decimal Price { get { return _price; } set { _price = value; } }
    }
}
