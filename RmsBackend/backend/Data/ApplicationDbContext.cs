using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }

        public DbSet<Produs> Produse { get; set; }
        public DbSet<Categorie> Categorii { get; set; }
        public DbSet<User> Users { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Produs>()
            .HasOne(c => c.Categorie)
            .WithMany(p => p.Produse)
            .HasForeignKey(c => c.CategorieId);
    }
    }

}
