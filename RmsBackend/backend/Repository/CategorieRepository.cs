using backend.Data;
using backend.Dto.Categorie;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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

        public async Task<Categorie> AddAsync(Categorie categorie)
        {
            _context.Categorii.Add(categorie);
            await _context.SaveChangesAsync();
            return categorie;
        }

        public async Task<bool> ExistsByNameAsync(string name)
        {
            return await _context.Categorii.AnyAsync(c=> c.Nume == name);
        }

        public async Task<List<Categorie>> GetAllAsync()
        {
            return await _context.Categorii.ToListAsync();
        }
    }
}
