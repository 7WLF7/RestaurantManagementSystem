using backend.Dto.Produs;

namespace backend.Interfaces
{
    public interface IProdusService
    {
        Task AddProdusAsync(CreateProdusRequestDto dto);
    }
}
