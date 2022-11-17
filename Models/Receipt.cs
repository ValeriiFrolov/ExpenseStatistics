namespace ExpenseStatistics.Models
{
    public class Receipt : BaseEntity
    {
        private DateTime _date;
        public DateTime Date { get { return _date; } set { _date = value; } }

        private decimal _totalAmount;
        public decimal TotalAmount { get { return _totalAmount; } set { _totalAmount = value; } }
        /*
        private List<ReceiptDetail>? _receiptDetails;
        public List<ReceiptDetail>? ReceiptDetails { get { return _receiptDetails; } set { value = _receiptDetails; } }
        */
    }
}
