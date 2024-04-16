using Application.ViewModels;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IUserGroupDisplayApp : IApp<UserGroupDisplayViewModel, UserGroup>
    {
        List<UserGroupDisplayViewModel> GetUserGroupListToTable();
    }
}