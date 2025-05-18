using backend.Dto.Categorie;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CategorieController : ControllerBase
{
    private readonly CategorieService _categorieService;

    public CategorieController(CategorieService categorieService)
    {
        _categorieService = categorieService;
    }

    [HttpPost("adauga-categorie")]
    public async Task<IActionResult> AdaugaCategorie([FromBody] CategorieDto categorieDto)
    {
        var categorieNoua = new Categorie
        {
            Nume = categorieDto.Nume
        };

        await _categorieService.AdaugaCategorie(categorieNoua);
        return Ok(categorieNoua);
    }
    [HttpGet("categorii-complet")]
    public async Task<IActionResult> AfiseazaToateCategoriile()
    {
        var categorii = await _categorieService.ObtineCategorii();
        return Ok(categorii);
    }
}
