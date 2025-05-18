using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
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

        public async Task AdaugaCategorie(Categorie categorie)
        {
            _context.Categorii.Add(categorie);
            await _context.SaveChangesAsync();
        }

        public Task<IActionResult> AfiseazaToateCategoriile()
        {
            throw new NotImplementedException();
        }

        public async Task<Categorie> GasesteCategorieDupaNume(string nume)
        {
            return await _context.Categorii.Include(c => c.Produse)
                                           .FirstOrDefaultAsync(c => c.Nume == nume);
        }

        public async Task<List<Categorie>> ObtineCategorii()
        {
            return await _context.Categorii.ToListAsync();
        }
    }
}
