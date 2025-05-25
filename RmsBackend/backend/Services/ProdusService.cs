using backend.Data;
using backend.Dto.Produs;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ProdusService : IProdusService
    {
        private readonly ApplicationDbContext _context;

        public ProdusService(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task AddProdusAsync(CreateProdusRequestDto dto)
        {
            var categorie = await _context.Categorii.FirstOrDefaultAsync(c => c.Nume == dto.CategorieNume);

            if (categorie == null)
            {
                throw new Exception($"Categoria '{dto.CategorieNume}' nu exista!");
            }

            var produs = new Produs
            {
                Nume = dto.CategorieNume,
                Descriere = dto.Description,
                Pret = dto.Pret,
                CategorieId = categorie.Id
            };

            _context.Produse.Add( produs );
            await _context.SaveChangesAsync();
        }
    }
}
