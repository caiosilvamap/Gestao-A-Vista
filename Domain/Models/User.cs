using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;


namespace Domain.Models
{
    public class User
    {
        public int Id { get; set; }

        [ForeignKey("UserGroupObj")]
        public int UserGroupId { get; set; }

        public string UserName { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Password { get; set; }

        public DateTime CreationDate { get; set; }

        public bool Active { get; set; }

        public bool Generic { get; set; }

        public string? GerenciaGeral { get; set; }

        [JsonIgnore]
        [NotMapped]
        [IgnoreDataMember]
        public virtual UserGroup? UserGroupObj { get; set; }
        [JsonIgnore]
        public virtual ICollection<Document>? Documents { get; set; } = new List<Document>();
    }


}