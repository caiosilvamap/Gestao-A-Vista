using Application.ViewModels;
using AutoMapper;
using Domain.Models;
using Domain.Interfaces;
using Application.Interfaces;


namespace Application
{
    public class DocumentCategoryApp : App<DocumentCategoryViewModel, DocumentCategory>, IDocumentCategoryApp
    {
        private readonly IMapper _mapper;
        private readonly IDocumentCategoryRepository _documentCategoryRepository;
        public DocumentCategoryApp(IDocumentCategoryRepository documentCategoryRepository, IMapper mapper) : base(mapper, documentCategoryRepository)
        {
            _documentCategoryRepository = documentCategoryRepository;
            _mapper = mapper;
        }

         public List<DocumentCategoryViewModel> GetDocumentCategoryListToSelect() => FindAllAsync().Result.ToList();
    }

}