using Domain.Interfaces;
using Infra.Data;
using Domain.Models;

namespace Infra.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DataContext context) : base(context)
        {

        }
    }
}