using backend.Data;
using backend.Dto.Produs;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/produse")]
    [ApiController]
    public class ProdusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IProdusRepository _produsRepo;
        private readonly IProdusService _produsService;
        public String _numeCategorie { get; set; }
        public ProdusController(ApplicationDbContext context, IProdusRepository produsRepo, IProdusService produsService)
        {
            _context = context;
            _produsRepo = produsRepo;
            _produsService = produsService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAll()
        {
            var produse = await _produsRepo.GetAllProdusAsync();
            var produsDto = produse.Select(s => s.ToProdusDto());

            return Ok(produse);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] CreateProdusRequestDto produsDto)
        {
            try
            {
                await _produsService.AddProdusAsync(produsDto);
                return Ok("Produs adaugat cu succes!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("ProduseDupaCategorie/{numeCategorie}")]
        public async Task<IActionResult> GetProduseByCategorie(string numeCategorie)
        {
            var produse = await _produsRepo.GetProduseByCategorieAsync(numeCategorie);
            var produsDto = produse.Select(p => new ProdusNumeDto
            {
                Nume = p.Nume,
                Id=p.Id,
                Descriere = p.Descriere
            }).ToList();

            return Ok(produsDto);
        }
    }
}
