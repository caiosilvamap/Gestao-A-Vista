namespace Domain.Models
{
    public class UserDisplay
    {

        public int Id { get; set; }

        public string? UserGroupName { get; set; }

        public string? UserName { get; set; } = null!;

        public string Name { get; set; } = null!;

        public bool Active { get; set; }

        public string? GerenciaGeral { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
