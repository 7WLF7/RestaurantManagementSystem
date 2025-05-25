using backend.Models;

namespace backend.Interfaces
{
    public interface IProdusRepository
    {
        Task<IEnumerable<Produs>> GetAllProdusAsync();
        Task<List<Produs>> GetProduseByCategorieAsync(string categorieNume);
    }
}
