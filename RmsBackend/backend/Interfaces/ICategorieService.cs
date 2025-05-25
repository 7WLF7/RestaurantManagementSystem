using backend.Dto.Categorie;

namespace backend.Interfaces
{
    public interface ICategorieService
    {
        Task<CategorieDto> AddCategoryAsync(CreateCategorieDto dto);
        Task<List<CategorieDto>> GetAllCategoriesAsync();
    }
}
