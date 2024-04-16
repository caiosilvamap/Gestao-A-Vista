using System.ComponentModel;

namespace Application.ViewModels
{
    public class UserGroupDisplayViewModel
    {
        public int Id { get; set; }

        [DisplayName("Grupo")]
        public string? Name { get; set; }

    }
}