using backend.Data;
using backend.Dto.Produs;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/produse")]
    [ApiController]
    public class ProdusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IProdusRepository _produsRepo;
        public ProdusController(ApplicationDbContext context, IProdusRepository produsRepo)
        {
            _context = context;
            _produsRepo = produsRepo;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetAll()
        {
            var produse = await _produsRepo.GetAllProdusAsync();
            var produsDto = produse.Select(s => s.ToProdusDto());

            return Ok(produse);
        }

        [HttpPost("add")]
        public IActionResult Create([FromBody] CreateProdusRequestDto produsDto)
        {
            var produsModel = produsDto.ToProdusFromCreateDto();
            _context.Produse.Add(produsModel);
            _context.SaveChanges();
            return Ok();  
        }
    }
}
