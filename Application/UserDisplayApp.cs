

using Application.Interfaces;
using Application.ViewModels.UserViewModels;
using AutoMapper;
using Domain.Interfaces;
using Domain.Models;

namespace Application
{
    public class UserDisplayApp : App<UserDisplayViewModel, User>, IUserDisplayApp
    {
        private readonly IUserDisplayRepository _userDisplayRepository;
        private readonly IMapper _mapper;

        public UserDisplayApp(IUserDisplayRepository userDisplayRepository, IMapper mapper) : base(mapper, userDisplayRepository)
        {
            _userDisplayRepository = userDisplayRepository;
            _mapper = mapper;
        }

        public List<UserDisplayViewModel> GetUserDisplayView()
        {
            try
            {
               var userList = FindAllAsync().Result.ToList();
               return userList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao Buscar usuários", ex);
            }
        }

    }

}