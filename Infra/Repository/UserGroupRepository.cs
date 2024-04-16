using Domain.Interfaces;
using Infra.Data;
using Domain.Models;

namespace Infra.Repository
{
    public class UserGroupRepository : Repository<UserGroup>, IUserGroupRepository
    {
        public UserGroupRepository(DataContext context) : base(context)
        {

        }
    }
}