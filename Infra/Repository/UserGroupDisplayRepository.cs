using Domain.Interfaces;
using Infra.Data;
using Domain.Models;

namespace Infra.Repository
{
    public class UserGroupDisplayRepository : Repository<UserGroup>, IUserGroupDisplayRepository
    {
        public UserGroupDisplayRepository(DataContext context) : base(context)
        {

        }
    }
}