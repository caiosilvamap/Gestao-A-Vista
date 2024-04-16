using Domain.Models;
using Domain.Interfaces;
using Infra.Data;

namespace Infra.Repository
{
    public class DocumentCategoryRepository : Repository<DocumentCategory>, IDocumentCategoryRepository
    {
        public DocumentCategoryRepository(DataContext context) : base(context)
        {

        }
    }
}