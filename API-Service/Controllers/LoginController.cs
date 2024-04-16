using System.Linq;
using Application;
using Application.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Domain.Models;
using Microsoft.IdentityModel.Tokens;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Cors;


namespace API_Service.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly IUserApp _userApp;
        private readonly ILoginApp _loginApp;
        private readonly IMapper _mapper;
        public LoginController(IUserApp userApp, ILoginApp loginApp, IMapper mapper)
        {
            _userApp = userApp;
            _loginApp = loginApp;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel userLogin)
        {
            if (!_userApp.UserExist(userLogin.UserName) || !_loginApp.IsValidLogin(userLogin.UserName, userLogin.Password))
            {
                return Unauthorized();
            }

            var token = _loginApp.GenerateToken(userLogin.UserName);

            if (_userApp.ValidateLoginDb(userLogin.UserName, userLogin.Password))
            {
                return Ok(new
                {
                    Token = token,
                    userName = userLogin.UserName.ToUpper(),
                    userId = _userApp.GetUserId(userLogin.UserName),
                    userGroupId = _userApp.GetUserGroupId(userLogin.UserName)
                });
            }

            return Ok(new
            {
                Token = token,
                userId = _userApp.GetUserId(userLogin.UserName),
                userGroupId = _userApp.GetUserGroupId(userLogin.UserName),
                userName = _loginApp.GetUserAdName(userLogin.UserName),
                profilePicture = _loginApp.GetUserAdProfilePicture(userLogin.UserName),
                position = _loginApp.GetUserAdProprietyByNameOfPropriety("title", userLogin.UserName),
                registration = _loginApp.GetUserAdProprietyByNameOfPropriety("name", userLogin.UserName),
            });

        }

        [HttpPost("validate")]
        public IActionResult ValidateLogin(Token tokenString)
        {
            if (!_loginApp.ValidateToken(tokenString.TokenString))
            {
                return Unauthorized();
            }

            return Ok(true);
        }

    }
}