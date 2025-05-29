using backend.Dto.Comanda;
using backend.Models;

namespace backend.Interfaces
{
    public interface IComandaService
    {
        Task PlaseazaComandaAsync(int? utilizatorId, PlaseazaComandaDto dto);
        Task<List<Comanda>> GetComenziPentruAngajatiAsync();
        Task ActualizeazaStatusulAsync(int comandaId, Status status);
        Task SeteazaTimpEstimativAsync(int comandaId, int minute);

        Task SeteazaMetodaPlataAsync(int comandaId, MetodaPlata metodaPlata);
    }
}
