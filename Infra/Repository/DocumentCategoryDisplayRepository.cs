using Domain.Models;
using Domain.Interfaces;
using Infra.Data;

namespace Infra.Repository
{
    public class DocumentCategoryDisplayRepository : Repository<DocumentCategory>, IDocumentCategoryDisplayRepository
    {
        public DocumentCategoryDisplayRepository(DataContext context) : base(context)
        {

        }
    }
}