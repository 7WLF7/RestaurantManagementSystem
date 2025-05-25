using System.ComponentModel.DataAnnotations;

namespace backend.Dto.Comanda
{
    public class ItemComandaDto
    {
        public int ProdusId { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage ="Cantitatea trebuie sa fie cel putin 1")]
        public int Cantitate { get; set; }
    }
}
