namespace backend.Dto.Produs
{
    public class CreateProdusRequestDto
    {
        public int Categorie { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }
}
