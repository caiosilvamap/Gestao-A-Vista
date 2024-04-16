using Domain.Interfaces;
using Infra.Data;
using Domain.Models;

namespace Infra.Repository
{
    public class DocumentRepository : Repository<Document>, IDocumentRepository
    {
        public DocumentRepository(DataContext context) : base(context)
        {

        }
    }
}