using Application.ViewModels;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IDocumentCategoryApp : IApp<DocumentCategoryViewModel, DocumentCategory>
    {
        List<DocumentCategoryViewModel> GetDocumentCategoryListToSelect();
    }
}