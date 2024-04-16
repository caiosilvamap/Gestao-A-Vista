

using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Domain.Models;
using Domain.Interfaces;
using Application.ViewModels;
using System.Security.Cryptography.X509Certificates;

namespace Application
{
    public class DocumentDisplayApp : App<DocumentDisplayViewModel, Document>, IDocumentDisplayApp
    {
        private readonly IDocumentDisplayRepository _documentDisplayRepository;
        private readonly IDocumentApp _documentApp;
        private readonly IMapper _mapper;

        public DocumentDisplayApp(IDocumentDisplayRepository documentDisplayRepository, IDocumentApp documentApp, IMapper mapper) : base(mapper, documentDisplayRepository)
        {
            _documentDisplayRepository = documentDisplayRepository;
            _documentApp = documentApp;
            _mapper = mapper;
        }

        public List<DocumentDisplayViewModel> GetDocumentDisplayView()
        {
            try
            {
                return FindAllAsync().Result.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao Buscar documentos", ex);
            }
        }
        public List<DocumentDisplayViewModel> GetUserDocumentDisplayView(int userId)
        {
            try
            {
                var documentList = WhereAsync(x => x.Active && (x.UserId == userId && !x.IsPublic || x.IsPublic)).Result.ToList();

                return documentList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao Buscar usuários", ex);
            }
        }

    }

}