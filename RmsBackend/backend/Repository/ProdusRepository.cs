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

        public async Task<List<Produs>> GetProduseByCategorieAsync(string categorieNume)
        {
            var categorie = await _context.Categorii
            .FirstOrDefaultAsync(c => c.Nume.ToLower() == categorieNume.ToLower());

            if (categorie == null)
                return new List<Produs>();

            return await _context.Produse
                .Include(p => p.Categorie)
                .Where(p => p.CategorieId == categorie.Id)
                .ToListAsync();
        }

        Task<IEnumerable<Produs>> IProdusRepository.GetAllProdusAsync()
        {
            throw new NotImplementedException();
        }
    }
}
