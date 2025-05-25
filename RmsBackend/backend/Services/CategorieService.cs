using backend.Dto.Categorie;
using backend.Interfaces;
using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace backend.Services
{
    public class CategorieService : ICategorieService
    {
        private readonly ICategorieRepository _repository;

        public CategorieService(ICategorieRepository categorieRepository)
        {
            _repository= categorieRepository;
        }

        public async Task<CategorieDto> AddCategoryAsync(CreateCategorieDto dto)
        {
            if(await _repository.ExistsByNameAsync(dto.nume))
            {
                throw new Exception("Categoria deja exista!");
            }

            var categorie = new Categorie { Nume= dto.nume };
            var added = await _repository.AddAsync(categorie);

            return new CategorieDto
            {
                Id = added.Id,
                Nume = dto.nume
            };
        }

        public async Task<List<CategorieDto>> GetAllCategoriesAsync()
        {
            var categorii = await _repository.GetAllAsync();

            return categorii.Select(c =>  new CategorieDto 
            {
                Id = c.Id,
                Nume=c.Nume
            }).ToList();
        }
    }
}
