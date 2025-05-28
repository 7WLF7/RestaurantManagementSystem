using backend.Data;
using backend.Dto.Produs;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/produse")]
    [ApiController]
    public class ProdusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IProdusRepository _produsRepo;
        private readonly ICategorieRepository _categorieRepo;
        
        public ProdusController(ApplicationDbContext context, IProdusRepository produsRepo, ICategorieRepository categorieRepo)
        {
            _context = context;
            _produsRepo = produsRepo;
            _categorieRepo= categorieRepo;
        }

        [HttpPost("adauga-produs/{numeCategorie}")]
        public async Task<IActionResult> AdaugaProdus(string numeCategorie, [FromBody] ProdusDto produsDto)
        {
            var categorie = await _categorieRepo.GasesteCategorieDupaNume(numeCategorie);
            if (categorie == null)
                return NotFound("Categoria nu a fost găsită");

            var produs = new Produs
            {
                Nume = produsDto.Nume,
                Descriere = produsDto.Descriere,
                Pret = produsDto.Pret,
                CantitateStoc = produsDto.CantitateStoc,
                CategorieId = categorie.Id
            };

            await _produsRepo.AdaugaProdus(produs);

            return Ok(produs);
        }

        [HttpGet("produse-pe-categorii")]
        public async Task<IActionResult> AfiseazaProduseGrupate()
        {
            var categorii = await _categorieRepo.ObtineCategorii();

            var rezultat = categorii.Select(c => new
            {
                Categorie = c.Nume,
                Produse = c.Produse.Select(p => new
                {
                    p.Nume,
                    p.Descriere,
                    p.Pret,
                    p.CantitateStoc
                })
            });

            return Ok(rezultat);
        }

<<<<<<< Updated upstream
=======
        [HttpGet("ProduseDupaCategorie/{numeCategorie}")]
        public async Task<IActionResult> GetProduseByCategorie(string numeCategorie)
        {
            var produse = await _produsRepo.GetProduseByCategorieAsync(numeCategorie);
            var produsDto = produse.Select(p => new ProdusNumeDto
            {
                Nume = p.Nume,
                Id=p.Id,
                Descriere = p.Descriere,
                Pret = p.Pret
            }).ToList();

            return Ok(produsDto);
        }
>>>>>>> Stashed changes
    }
}
