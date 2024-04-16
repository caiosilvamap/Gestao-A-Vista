using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class Document
    {
        public int Id { get; set; }

        [ForeignKey("UserObj")]
        public int UserId { get; set; }
        
        [ForeignKey("DocumentCategoryObj")]
        public int DocumentCategoryId { get; set; }

        public string Name { get; set; } = null!;

        public string? PathFile { get; set; }

        public string? PathSlide { get; set; }

        public string? PathFileCarousel { get; set; }

        public string? PathSlideCarousel { get; set; }

        public bool Active { get; set; }

        public bool IsPublic { get; set; }

        public DateTime CreationDate { get; set; }

        [JsonIgnore]
        public virtual DocumentCategory? DocumentCategoryObj { get; set; }

        [JsonIgnore]
        public virtual User UserObj { get; set; }

    }
}