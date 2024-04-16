using Application.ViewModels;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IUserGroupApp : IApp<UserGroupViewModel, UserGroup>
    {
        List<UserGroupViewModel> GetUserGroupListView();
    }
}