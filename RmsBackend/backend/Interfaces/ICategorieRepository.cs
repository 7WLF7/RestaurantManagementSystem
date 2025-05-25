using backend.Dto.Categorie;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ICategorieRepository
    {
        Task<bool> ExistsByNameAsync(string name);
        Task<Categorie> AddAsync(Categorie categorie);
        Task<List<Categorie>> GetAllAsync();

    }
}
