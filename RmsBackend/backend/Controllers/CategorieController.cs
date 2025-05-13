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

    [HttpGet]
    public async Task<IActionResult> GetCategorii()
    {
        var categorii = await _categorieService.GetCategoriiAsync();
        return Ok(categorii);
    }
}
