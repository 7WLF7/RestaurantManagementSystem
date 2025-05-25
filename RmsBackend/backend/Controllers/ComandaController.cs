using backend.Dto.Comanda;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComandaController : ControllerBase
    {
        private readonly IComandaService _comandaService;
        public ComandaController(IComandaService comandaService)
        {
            _comandaService = comandaService;
        }
        public const string Admin = nameof(Rol.Admin);
        public const string Client = nameof(Rol.Client);
        public const string Angajat = nameof(Rol.Angajat);

        [HttpPost]

        public async Task<IActionResult> PlaseazaComanda([FromBody] CreeazaComandaDto dto)
        {
            int? utilizatorId = null;
            var userIdClaim=User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(!string.IsNullOrEmpty(userIdClaim))
            {
                utilizatorId=int.Parse(userIdClaim);
            }

            await _comandaService.PlaseazaComandaAsync(utilizatorId, dto);
            return Ok("Comanda plasata cu succes");
            //var utilizatorId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            //await _comandaService.PlaseazaComandaAsync(utilizatorId, dto);
            //return Ok("Comanda plasata cu succes");
        }

        [HttpGet("toate")]
        [Authorize(Roles = "Angajat,Admin")]
        public async Task<IActionResult> GetComenzi()
        {
            var comenzi = await _comandaService.GetComenziPentruAngajatiAsync();
            return Ok(comenzi);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Angajat,Admin")]
        public async Task<IActionResult> ActualizeazaStatus(int id, [FromQuery] Status status)
        {
            await _comandaService.ActualizeazaStatusulAsync(id, status);
            return Ok("StatusActualizat");
        }

        [HttpPut("{id}/timp")]
        [Authorize(Roles = "Angajat,Admin")]
        public async Task<IActionResult> SeteazaTimp(int id, [FromQuery] int minute)
        {
            await _comandaService.SeteazaTimpEstimativAsync(id, minute);
            return Ok("Timp estimativ setat!");
        }

    }
}
