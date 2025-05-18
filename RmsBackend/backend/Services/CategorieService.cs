using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public class CategorieService : ICategorieRepository
    {
        private readonly ICategorieRepository _categorieRepository;

        public CategorieService(ICategorieRepository categorieRepository)
        {
            _categorieRepository = categorieRepository;
        }

        public async Task AdaugaCategorie(Categorie categorie) => await _categorieRepository.AdaugaCategorie(categorie);

        public Task<IActionResult> AfiseazaToateCategoriile()
        {
            throw new NotImplementedException();
        }

        public async Task<Categorie> GasesteCategorieDupaNume(string nume) => await _categorieRepository.GasesteCategorieDupaNume(nume);
        public async Task<List<Categorie>> ObtineCategorii() => await _categorieRepository.ObtineCategorii();
    }
}
