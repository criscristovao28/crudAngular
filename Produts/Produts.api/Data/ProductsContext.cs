using Microsoft.EntityFrameworkCore;
using Produts.api.Models;

namespace Produts.api.Data
{
    public class ProductsContext: DbContext
    {
        public IConfiguration Configuration { get; }
        public ProductsContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public DbSet<Product> Products { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("ServerConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>();
        }
    }
}
