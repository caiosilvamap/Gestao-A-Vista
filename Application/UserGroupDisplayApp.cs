using Application.Interfaces;
using Domain.Models;
using Domain.Interfaces;
using Application.ViewModels;
using AutoMapper;

namespace Application
{
    public class UserGroupDisplayApp : App<UserGroupDisplayViewModel, UserGroup>, IUserGroupDisplayApp
    {
        private readonly IUserGroupDisplayRepository _userDisplayGroupRepository;
        private readonly IMapper _mapper;
        public UserGroupDisplayApp(IUserGroupDisplayRepository userDisplayGroupRepository, IMapper mapper) : base(mapper, userDisplayGroupRepository)
        {
            _userDisplayGroupRepository = userDisplayGroupRepository;
            _mapper = mapper;
        }


        public List<UserGroupDisplayViewModel> GetUserGroupListToTable()
        {
            try
            {
                return FindAllAsync().Result.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao Buscar grupo de usuario", ex);
            }
        }


    }

}