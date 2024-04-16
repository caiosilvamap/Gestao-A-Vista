using System.ComponentModel;


namespace Application.ViewModels
{
    public class DocumentCategoryDisplayViewModel
    {

        public int Id { get; set; }

        [DisplayName("Categoria")]
        public string Name { get; set; } = null!;

        [DisplayName("Ativo")]
        public bool Active { get; set; }

    }
}