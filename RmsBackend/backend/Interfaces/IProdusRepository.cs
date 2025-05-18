using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface IProdusRepository
    {
        Task AdaugaProdus(Produs produs);
        Task<List<Produs>> ObtineProdusePeCategorie(string numeCategorie);
        Task<IActionResult> AfiseazaProduseGrupate();
    }
}
