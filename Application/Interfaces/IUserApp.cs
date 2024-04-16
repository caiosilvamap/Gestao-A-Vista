using Application.ViewModels;
using Application.ViewModels.UserViewModels;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IUserApp : IApp<UserViewModel, User>

    {
        List<User> GetUsers();

        int GetUserGroupId( string userName);

        bool UserExist(string userName);

        bool ValidateLoginDb(string userName, string password);
        
        int GetUserId (string userName);
    }
}