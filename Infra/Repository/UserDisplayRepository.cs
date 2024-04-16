using Domain.Models;
using Domain.Interfaces;
using Infra.Data;

namespace Infra.Repository
{
    public class UserDisplayRepository : Repository<User>, IUserDisplayRepository
    {
        public UserDisplayRepository(DataContext context) : base(context)
        {

        }
    }
}