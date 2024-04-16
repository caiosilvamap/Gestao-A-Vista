
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Application.ViewModels.UserViewModels;
using Microsoft.AspNetCore.Http;

namespace Application.ViewModels
{
    public class DocumentViewModel
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int DocumentCategoryId { get; set; }

        public string Name { get; set; } = null!;

        public string? PathFile { get; set; }

        public string? PathSlide { get; set; }

        public string? PathFileCarousel { get; set; }

        public string? PathSlideCarousel { get; set; }

        public bool Active { get; set; }

        public bool IsPublic { get; set; }

        public DateTime? CreationDate { get; set; }

        public IFormFile? Slide { get; set; }

        public IFormFile? File { get; set; }

    }


}