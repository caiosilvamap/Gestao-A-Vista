using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class DocumentCategoryDisplay
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public bool Active { get; set; }

    }
}