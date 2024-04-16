using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Application.ViewModels.UserViewModels
{
    public class UserDisplayViewModel
    {
        public int Id { get; set; }

        [DisplayName("Grupo")]
        public string? UserGroupName { get; set; }

        [DisplayName("Nome de Usuário")]
        public string? UserName { get; set; } = null!;

        [DisplayName("Nome Social")]
        public string Name { get; set; } = null!;

        [DisplayName("Ativo")]
        public bool Active { get; set; }

        [DisplayName("Gerencia Geral")]
        public string? GerenciaGeral { get; set; }

        [DisplayName("Data de Cadastro")]
        public DateTime CreationDate { get; set; }
    }
}