using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Models
{
    public class DocumentDisplay
    {
        public int Id { get; set; }

        public string? userName { get; set; }

        public string? Name { get; set; } 

        public string? Source { get; set; } 

        public bool? Active { get; set; }

        public bool? IsPublic { get; set; }

        public string CreationDate { get; set; }

    }
}