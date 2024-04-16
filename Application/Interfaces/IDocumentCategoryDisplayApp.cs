using Domain.Models;
using Application.ViewModels;

namespace Application.Interfaces
{
    public interface IDocumentCategoryDisplayApp : IApp<DocumentCategoryDisplayViewModel, DocumentCategory>
    {
        List<DocumentCategoryDisplayViewModel> GetDocumentCategoryDisplayView();
    }
}