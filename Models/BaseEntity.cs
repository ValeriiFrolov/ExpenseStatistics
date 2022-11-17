namespace ExpenseStatistics.Models
{
    public abstract class BaseEntity
    {
        private Guid _id;
        public Guid Id { get { return _id; } set { _id = value; } }

        private DateTime? _createdOn;
        public DateTime? СreatedOn { get { return _createdOn; } set { _createdOn = value; } }

        private User? _createdBy;
        public User? СreatedBy { get { return _createdBy; } set { _createdBy = value; } }
    }
}
