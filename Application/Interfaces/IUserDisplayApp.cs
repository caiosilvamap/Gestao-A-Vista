using Application.ViewModels;
using Application.ViewModels.UserViewModels;
using Domain.Models;

namespace Application.Interfaces
{
    public interface IUserDisplayApp : IApp<UserDisplayViewModel, User>

    {
        List<UserDisplayViewModel> GetUserDisplayView();
    }
}