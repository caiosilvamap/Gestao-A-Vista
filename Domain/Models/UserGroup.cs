using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class UserGroup
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        [JsonIgnore]
        [NotMapped]
        [IgnoreDataMember]
        public virtual ICollection<User>? Users { get; set; } = new List<User>();

    }
}