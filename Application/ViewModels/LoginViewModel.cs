using System.ComponentModel.DataAnnotations;

namespace Application.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Nome de Usuário", Prompt = "Nome de Usuário")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Senha", Prompt = "Senha")]
        public string Password { get; set; }

    }
}