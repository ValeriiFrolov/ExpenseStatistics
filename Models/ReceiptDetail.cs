namespace ExpenseStatistics.Models
{
    public class ReceiptDetail : BaseEntity
    {
        /*
        private Receipt _receipt;
        public Receipt Receipt { get { return _receipt; } set { _receipt = value; } }
        */
        private Guid _receiptId;
        public Guid ReceiptId { get { return _receiptId; } set { _receiptId = value; } }

        private Product? _product;
        public Product? Product { get { return _product; } set { _product = value; } }

        private decimal? _amount;
        public decimal? Amount { get { return _amount; } set { _amount = value; } }

        private decimal? _quantity;
        public decimal? Quantity { get { return _quantity; } set { _quantity = value; } }


    }
}
