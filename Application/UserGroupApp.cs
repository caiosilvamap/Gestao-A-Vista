using Application.Interfaces;
using Domain.Models;
using Domain.Interfaces;
using Application.ViewModels;
using AutoMapper;

namespace Application
{
    public class UserGroupApp : App<UserGroupViewModel, UserGroup>, IUserGroupApp
    {
        private readonly IUserGroupRepository _userGroupRepository;
        private readonly IMapper _mapper;
        public UserGroupApp(IUserGroupRepository userGroupRepository, IMapper mapper) : base(mapper, userGroupRepository)
        {
            _userGroupRepository = userGroupRepository;
            _mapper = mapper;
        }

        public List<UserGroupViewModel> GetUserGroupListView() => FindAllAsync().Result.ToList();
    }

}