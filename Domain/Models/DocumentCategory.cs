using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class DocumentCategory
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public bool Active { get; set; }

        [JsonIgnore]
        [NotMapped]
        [IgnoreDataMember]
        public virtual ICollection<Document>? Documents { get; set; } = new List<Document>();

    }
}