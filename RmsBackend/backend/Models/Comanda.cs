namespace backend.Models
{
    public class Comanda
    {
        public int Id { get; set; }
        public int? UtilizatorId { get; set; }
        public User Utilizator { get; set; }
        public DateTime DataPlasare { get; set; } = DateTime.Now;
        public Status Status { get; set; } = Status.InAsteptare;
        public List<ComandaProdus> ProduseComanda { get; set; }
        public decimal Total { get; set; }
        public string? MetodaPlata { get; set; }
        public int? TimpEstimativMinute { get; set; }
    }
    public class ComandaProdus
    {
        public int ProdusId { get; set; }
        public Produs Produs { get; set; }

        public int ComandaId { get; set; }
        public Comanda Comanda { get; set; }

        public int Cantitate { get; set; }

        public List<ComandaProdus> ProduseComandate { get; set; }
    }

    public enum Status
    {
        InAsteptare,
        InPreparare,
        Servita
    }
}
