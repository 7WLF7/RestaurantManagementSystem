using backend.Models;

namespace backend.Interfaces
{
    public interface IComandaRepository
    {
        Task AdaugaComenziAsync(List<Comanda> comenzi);
    }
}
