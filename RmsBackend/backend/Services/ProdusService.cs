using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public class ProdusService : IProdusRepository
    {
        private readonly IProdusRepository _produsRepository;

        public ProdusService(IProdusRepository produsRepository)
        {
            _produsRepository = produsRepository;
        }

        public async Task AdaugaProdus(Produs produs) => await _produsRepository.AdaugaProdus(produs);

        public Task<IActionResult> AfiseazaProduseGrupate()
        {
            throw new NotImplementedException();
        }

        public async Task<List<Produs>> ObtineProdusePeCategorie(string numeCategorie) => await _produsRepository.ObtineProdusePeCategorie(numeCategorie);
    }
}
