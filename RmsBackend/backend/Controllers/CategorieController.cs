using backend.Dto.Categorie;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

[Route("api/[controller]")]
[ApiController]
public class CategorieController : ControllerBase
{
    private readonly CategorieService _categorieService;

    public CategorieController(CategorieService categorieService)
    {
        _categorieService = categorieService;
    }

    [HttpPost]
    public async Task<IActionResult> AddCategorie([FromBody] CreateCategorieDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.nume))
            return BadRequest("Numele categoriei este necesar!");
        try
        {
            var result = await _categorieService.AddCategoryAsync(dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return Conflict(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categorii = await _categorieService.GetAllCategoriesAsync();
        return Ok(categorii);
    }

}

