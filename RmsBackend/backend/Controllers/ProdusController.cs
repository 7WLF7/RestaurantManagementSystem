using backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("backend/produse")]
    [ApiController]
    public class ProdusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProdusController(ApplicationDbContext context)
        {
            _context = context;

        }
        [HttpGet]
        public IActionResult GetProduse()
        {
            var produse = _context.Produse.ToList();

            return Ok(produse);
        }
    }
}
