using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Repository
{
    public class ProdusRepository : IProdusRepository
    {
        private readonly ApplicationDbContext _context;

        public ProdusRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AdaugaProdus(Produs produs)
        {
            _context.Produse.Add(produs);
            await _context.SaveChangesAsync();
        }

        public Task<IActionResult> AfiseazaProduseGrupate()
        {
            throw new NotImplementedException();
        }

        public async Task<List<Produs>> ObtineProdusePeCategorie(string numeCategorie)
        {
            return await _context.Produse.Include(p => p.Categorie)
                                         .Where(p => p.Categorie.Nume == numeCategorie)
                                         .ToListAsync();
        }
    }
}
