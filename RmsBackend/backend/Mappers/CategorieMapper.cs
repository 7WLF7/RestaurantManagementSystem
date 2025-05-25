using backend.Dto.Categorie;
using backend.Models;

namespace backend.Mappers
{
    public class CategorieMapper
    {
        public static CategorieDto ToDto(Categorie categorie)
        {
            return new CategorieDto
            {
                Id = categorie.Id,
                Nume = categorie.Nume
            };
        }
        public static Categorie ToModel(CategorieDto dto)
        {
            return new Categorie
            {
                Id = dto.Id,
                Nume = dto.Nume
            };
        }
    }
}
