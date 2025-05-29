using backend.Data;
using backend.Dto.Comanda;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ComandaService : IComandaService
    {
        private readonly ApplicationDbContext _context;

        public ComandaService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task ActualizeazaStatusulAsync(int comandaId, Status status)
        {
            var comanda = await _context.Comenzi.FindAsync(comandaId);
            if (comanda == null)
            {
                throw new Exception("Comanda nu a fost gasita!");
            }
            comanda.Status = status; 
            await _context.SaveChangesAsync();
        }

        public async Task<List<Comanda>> GetComenziPentruAngajatiAsync()
        {
            return await _context.Comenzi
                .Where(c => c.Status != Status.Servita)
                .Include(c => c.Utilizator)
                .Include( c=> c.ProduseComanda)
                .ThenInclude(pc => pc.Produs)
                .ToListAsync();
        }

        public async Task PlaseazaComandaAsync(int? utilizatorId, PlaseazaComandaDto dto)
        {
            var comanda = new Comanda
            {
                UtilizatorId = utilizatorId,
                DataPlasare = DateTime.Now,
                Status = Status.InAsteptare,
                Total = dto.Total,
                ProduseComanda = dto.Produse.Select(p => new ComandaProdus
                {
                    ProdusId = p.ProdusId,
                    Cantitate = p.Cantitate
                }).ToList(),
            };

            _context.Comenzi.Add(comanda);
            await _context.SaveChangesAsync();
        }

        public async Task SeteazaTimpEstimativAsync(int comandaId, int minute)
        {
            var comanda = await _context.Comenzi.FindAsync(comandaId);
            if (comanda == null)
                throw new Exception("Comanda nu a fost gasita!");

            comanda.TimpEstimativMinute = minute;
            await _context.SaveChangesAsync();
        }
    }
}
