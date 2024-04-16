using Application.ViewModels;
using Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IDocumentApp : IApp<DocumentViewModel, Document>
    {
        string GetParentDirectory(string directoryPath, int levels);
        int GetLastId();
        FilePaths CreateSlideDirectory(string userName, IFormFile file);
        FilePaths EditExistingFileDirectory(string pathFileDB, string pathFileCarouselDB, IFormFile file);
        FilePaths EditSlideDirectory(string pathSlideDB, string pathSlideCarouselDB, IFormFile slide);
        FilePaths CreateFileDirectory(string userName, IFormFile file);
        FilePaths EditFileDirectory(string userName, IFormFile file, int documentId);
        List<DocumentViewModel> GetUserDocument(int idUser);
    }

}