using backend.Interfaces;
using backend.Models;

namespace backend.Services
{
    public class CategorieService
    {
        private readonly ICategorieRepository _categorieRepository;

        public CategorieService(ICategorieRepository categorieRepository)
        {
            _categorieRepository = categorieRepository;
        }

        public async Task<IEnumerable<Categorie>> GetCategoriiAsync()
        {
            return await _categorieRepository.GetAllCategoriiAsync();
        }
    }
}
