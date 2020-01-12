using Microsoft.EntityFrameworkCore;

namespace Projekt.Context
{
    public class MyDbContext : DbContext
    {
        public DbSet<Expense> Expenses { get; set; }
                
            
        public MyDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}