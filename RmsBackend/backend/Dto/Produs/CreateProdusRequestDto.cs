namespace backend.Dto.Produs
{
    public class CreateProdusRequestDto
    {
        public String CategorieNume { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public decimal Pret { get; set; }
        public int CantitateStoc { get; set; }
    }
}
