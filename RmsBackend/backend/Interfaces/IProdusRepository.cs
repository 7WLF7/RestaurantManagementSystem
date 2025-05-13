using backend.Models;

namespace backend.Interfaces
{
    public interface IProdusRepository
    {
        Task<List<Produs>> GetAllProdusAsync();
    }
}
