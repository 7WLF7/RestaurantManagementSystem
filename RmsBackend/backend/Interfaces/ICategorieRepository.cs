using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ICategorieRepository
    {
        Task AdaugaCategorie(Categorie categorie);
        Task<Categorie> GasesteCategorieDupaNume(string nume);
        Task<List<Categorie>> ObtineCategorii();
        Task<IActionResult> AfiseazaToateCategoriile();
    }
}
