namespace backend.Models
{
    public class Produs
    {
        public int Id { get; set; }
        public string Nume { get; set; }
        public string Descriere { get; set; }
        public decimal Pret { get; set; }
        public int CantitateStoc { get; set; }
        public int CategorieId { get; set; }
        public Categorie Categorie { get; set; }
    }
}
