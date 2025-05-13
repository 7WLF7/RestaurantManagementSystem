namespace backend.Models
{
    public class Comanda
    {
        public int Id { get; set; }
        public int UtilizatorId { get; set; }
        public User Utilizator { get; set; }
        public DateTime Data { get; set; }
        public string Status { get; set; } 
        public List<ComandaProdus> Produse { get; set; }
    }
    public class ComandaProdus
    {
        public int Id { get; set; }
        public int ComandaId { get; set; }
        public int ProdusId { get; set; }
        public int Cantitate { get; set; }
    }
}
