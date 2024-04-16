using Application.ViewModels;

using Domain.Models;

namespace Application.Interfaces
{
    public interface IDocumentDisplayApp : IApp<DocumentDisplayViewModel, Document>
    {
        List<DocumentDisplayViewModel> GetDocumentDisplayView();
        List<DocumentDisplayViewModel> GetUserDocumentDisplayView(int IdUser);
    }
}