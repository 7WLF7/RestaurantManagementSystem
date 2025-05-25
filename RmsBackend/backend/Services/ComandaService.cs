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
                .Include(c=> c.Utilizator)
                .Include(c=> c.ProduseComanda).ThenInclude(pc=> pc.Produs)
                .ToListAsync();
        }

        public async Task PlaseazaComandaAsync(int? utilizatorId, CreeazaComandaDto dto)
        {
            if (dto.Produse == null || !dto.Produse.Any())
                throw new Exception("Comanda trebuie să conțină cel puțin un produs.");

            var comanda = new Comanda
            {
                UtilizatorId = utilizatorId,
                ProduseComanda = new List<ComandaProdus>()
            };

            decimal total = 0;

            foreach (var item in dto.Produse)
            {
                if (item.Cantitate <= 0)
                    throw new Exception("Cantitatea trebuie să fie mai mare decât 0.");

                var produs = await _context.Produse.FindAsync(item.ProdusId);
                if (produs == null)
                    throw new Exception($"Produsul cu ID {item.ProdusId} nu a fost găsit.");

                if (produs.CantitateStoc < item.Cantitate)
                    throw new Exception($"Produsul {produs.Nume} nu are stoc suficient.");

                produs.CantitateStoc -= item.Cantitate;

                total += item.Cantitate * produs.Pret;

                comanda.ProduseComanda.Add(new ComandaProdus
                {
                    ProdusId = produs.Id,
                    Cantitate = item.Cantitate
                });
            }

            comanda.Total = total;

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
