using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Repository
{
    public class CategorieRepository : ICategorieRepository
    {
        private readonly ApplicationDbContext _context;

        public CategorieRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Categorie>> GetAllCategoriiAsync()
        {
            return await _context.Categorii.ToListAsync();
        }
    }
}
