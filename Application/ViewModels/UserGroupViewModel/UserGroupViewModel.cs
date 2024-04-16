using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Application.ViewModels.UserViewModels;

namespace Application.ViewModels
{
    public class UserGroupViewModel
    {
        public int Id { get; set; }

     
        public string? Name { get; set; }

    }
}