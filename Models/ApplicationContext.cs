using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace ExpenseStatistics.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        private DbSet<User> _user;
        public DbSet<User> User { get { return _user; } set { _user = value; } }

        private DbSet<Receipt> _receipt;
        public DbSet<Receipt> Receipt { get { return _receipt; } set { _receipt = value; } }

        private DbSet<ReceiptDetail> _receiptDetail;
        public DbSet<ReceiptDetail> ReceiptDetail { get { return _receiptDetail; } set { _receiptDetail = value; } }

        private DbSet<Product> _product;
        public DbSet<Product> Product { get { return _product; } set { _product = value; } }

        private DbSet<ProductPrice> _productPrice;
        public DbSet<ProductPrice> ProductPrice { get { return _productPrice; } set { _productPrice = value; } }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<ReceiptDetail>().Navigation(e => e.Receipt).AutoInclude();

            //modelBuilder.Entity<Receipt>().HasOne<ReceiptDetail>(s => s.Id).WithOne(g => g.ReceiptDetails).HasForeignKey(k => k.ReceiptId);
            modelBuilder.Entity<ReceiptDetail>().HasOne<Receipt>().WithMany().HasForeignKey(rd => rd.ReceiptId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ReceiptDetail>().HasOne<Product>().WithMany().HasForeignKey(rd => rd.ProductId).OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<ProductPrice>().HasOne<Product>().WithMany().HasForeignKey(rd => rd.ProductId).OnDelete(DeleteBehavior.Cascade);
        }
    }

    public static class ModelBuilderExtensions
    {
        public static void RegisterAllEntities<BaseModel>(this ModelBuilder modelBuilder, params Assembly[] assemblies)
        {
            IEnumerable<Type> types = assemblies.SelectMany(a => a.GetExportedTypes()).Where(c => c.IsClass && !c.IsAbstract && c.IsPublic &&
              typeof(BaseModel).IsAssignableFrom(c));
            foreach (Type type in types)
                modelBuilder.Entity(type);
        }
    }
}
