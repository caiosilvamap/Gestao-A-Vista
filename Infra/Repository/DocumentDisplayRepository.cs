using Domain.Models;
using Domain.Interfaces;
using Infra.Data;

namespace Infra.Repository
{
    public class DocumentDisplayRepository : Repository<Document>, IDocumentDisplayRepository
    {
        public DocumentDisplayRepository(DataContext context) : base(context)
        {

        }
    }
}