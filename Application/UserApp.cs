using Application.Interfaces;
using Domain.Models;
using Domain.Interfaces;
using AutoMapper;
using Application.ViewModels.UserViewModels;
using System.Security.Cryptography.X509Certificates;

namespace Application
{
    public class UserApp : App<UserViewModel, User>, IUserApp
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        private readonly IUserDisplayApp _userDisplayApp;

        public UserApp(IUserRepository userRepository, IMapper mapper, IUserDisplayApp userDisplayApp) : base(mapper, userRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userDisplayApp = userDisplayApp;
        }

        public List<User> GetUsers() => _userRepository.WhereAsync(u => u.Active).Result.ToList();

        public bool UserExist(string userNameView)
        {
            if (GetUsers().Any(u => u.UserName?.ToUpper() == userNameView.ToUpper()))
            {
                return true;
            }
            return false;
        }

        public bool ValidateLoginDb(string userNameView, string password)
        {
            if (GetUsers().Any(u => u.UserName.ToUpper() == userNameView.ToUpper() && u.Password == password))
            {
                return true;
            }
            return false;
        }

        public int GetUserGroupId(string userName)
        {
            if (!string.IsNullOrEmpty(userName))
            {
                var userGroupId = GetUsers().Where(x => x.UserName.ToUpper() == userName.ToUpper()).Select(x => x.UserGroupId).FirstOrDefault();
                return userGroupId;
            }

            return -1;
        }

        public int GetUserId(string userName)
        {
            if (!string.IsNullOrEmpty(userName))
            {
                var userId = GetUsers().Where(x => x.UserName.ToUpper() == userName.ToUpper()).Select(x => x.Id).FirstOrDefault();
                return userId;
            }

            return -1;
        }

        public override async Task<UserViewModel> CreateAsync(UserViewModel userView)
        {
            try
            {
                var userModel = _mapper.Map<User>(userView);
                userModel.CreationDate = DateTime.UtcNow.AddHours(-3);
                await _userRepository.CreateAsync(userModel);
                return userView;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao adicionar usuário", ex);
            }
        }

        // public override async Task<UserViewModel> EditAsync(UserViewModel userView)
        // {
        //     try
        //     {
        //         var userModel = _mapper.Map<User>(userView);

        //         await _userRepository.EditAsync(userModel);
        //         return viewModel;
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine(ex);
        //         throw new ApplicationException("Erro ao editar", ex);
        //     }
        // }
    }
}