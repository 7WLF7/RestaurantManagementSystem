namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Nume { get; set; }
        public string Email { get; set; }
        public string ParolaHash { get; set; }
        public Rol Rol { get; set; }
    }
    public enum Rol
    {
        Admin,
        Angajat,
        Client
    }
}
