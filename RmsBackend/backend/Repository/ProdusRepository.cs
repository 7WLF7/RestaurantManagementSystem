using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ProdusRepository : IProdusRepository
    {
        private readonly ApplicationDbContext _context;
        public ProdusRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public Task<List<Produs>> GetAllProdusAsync()
        {
            return _context.Produse.ToListAsync();
        }
    }
}
