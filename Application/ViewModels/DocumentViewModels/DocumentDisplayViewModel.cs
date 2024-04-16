using System.ComponentModel;

namespace Application.ViewModels
{
    public class DocumentDisplayViewModel
    {
        public int Id { get; set; }

        [DisplayName("Nome de Usuário")]
        public string? UserName { get; set; }

        [DisplayName("Nome do Documento")]
        public string? Name { get; set; }

        [DisplayName("Categoria")]
        public string? Categoria {get; set;}

        [DisplayName("Caminho do Documento")]
        public string? PathFileCarousel { get; set; }

        [DisplayName("Caminho do Slide")]
        public string? PathSlideCarousel { get; set; }

        [DisplayName("Ativo")]
        public bool Active { get; set; }

        [DisplayName("Publico")]
        public bool IsPublic { get; set; }

        [DisplayName("Data de Criação")]
        public DateTime CreationDate { get; set; }
    }


}