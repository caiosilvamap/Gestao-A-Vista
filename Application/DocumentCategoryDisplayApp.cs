

using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Domain.Models;
using Domain.Interfaces;

namespace Application
{
    public class DocumentCategoryDisplayApp : App<DocumentCategoryDisplayViewModel, DocumentCategory>, IDocumentCategoryDisplayApp
    {
        private readonly IDocumentCategoryDisplayRepository _documentCategoryDisplayRepository;
        private readonly IDocumentCategoryApp _documentCategoryApp;
        private readonly IMapper _mapper;

        public DocumentCategoryDisplayApp(IDocumentCategoryDisplayRepository documentCategoryDisplayRepository, IDocumentCategoryApp documentCategoryApp, IMapper mapper) : base(mapper, documentCategoryDisplayRepository)
        {
            _documentCategoryDisplayRepository = documentCategoryDisplayRepository;
            _documentCategoryApp = documentCategoryApp;
            _mapper = mapper;
        }

        public List<DocumentCategoryDisplayViewModel> GetDocumentCategoryDisplayView()
        {
            try
            {
                return FindAllAsync().Result.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao Buscar categoria de documentos", ex);
            }
        }
    }

}