using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Application.ViewModels.UserViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        
        public int UserGroupId { get; set; }

        [DisplayName("Nome de Usuário")]
        public string? UserName { get; set; } = null!;

        [DisplayName("Nome")]
        public string Name { get; set; } = null!;

        [DisplayName("Data de Cadastro")]
        public DateTime? CreationDate { get; set; }

        [DisplayName("Ativo")]
        public bool Active { get; set; }

        public bool Generic { get; set; }

        public string? GerenciaGeral { get; set; }

        [IgnoreDataMember]
        public string? Password { get; set; }

    }


}