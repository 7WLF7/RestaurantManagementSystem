using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.Dto.Produs
{
    public class ProdusDto
    {
        public string Categorie { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }

    }
}
