namespace backend.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public int ComandaId { get; set; }
        public int UtilizatorId { get; set; }
        public int Rating { get; set; }
        public string Comentariu { get; set; }
    }

}
