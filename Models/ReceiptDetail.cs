namespace ExpenseStatistics.Models
{
    public class ReceiptDetail : BaseEntity
    {
        private Guid _receiptId;
        public Guid ReceiptId { get { return _receiptId; } set { _receiptId = value; } }

        private Guid? _productId;
        public Guid? ProductId { get { return _productId; } set { _productId = value; } }

        private decimal? _amount;
        public decimal? Amount { get { return _amount; } set { _amount = value; } }

        private decimal? _quantity;
        public decimal? Quantity { get { return _quantity; } set { _quantity = value; } }


    }
}
