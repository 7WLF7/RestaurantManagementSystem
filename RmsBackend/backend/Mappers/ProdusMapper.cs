using backend.Dto.Produs;
using backend.Models;

namespace backend.Mappers
{
    public static class ProdusMapper
    {
        public static ProdusDto ToProdusDto(this Produs produsModel)
        {
            return new ProdusDto
            {
                Name = produsModel.Nume,
                Description = produsModel.Descriere,
            };
        }
        public static Produs ToProdusFromCreateDto(this CreateProdusRequestDto produsDto)
        {
            return new Produs
            {
                Nume = produsDto.Name,
                Descriere=produsDto.Description,

            };
        }
    }
}
