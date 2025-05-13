using backend.Models;

namespace backend.Interfaces
{
    public interface ICategorieRepository
    {
        Task<IEnumerable<Categorie>> GetAllCategoriiAsync();
    }
}
