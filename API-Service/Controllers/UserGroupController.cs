using Application.Interfaces;
using Application.ViewModels;
using Domain.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API_Service.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]

    public class UserGroupController : Controller
    {
        private readonly IUserGroupApp _userGroupApp;
        private readonly IUserGroupDisplayApp _userGroupDisplayApp;
        public UserGroupController(IUserGroupApp userGroupApp, IUserGroupDisplayApp userGroupDisplayApp)
        {
            _userGroupDisplayApp = userGroupDisplayApp;
            _userGroupApp = userGroupApp;
        }


        [HttpGet("GetAllToSelect")]
        public IActionResult GetAllToSelect()
        {
            try
            {
                if (_userGroupApp.GetUserGroupListView().Any())
                {
                    return Ok(_userGroupApp.GetUserGroupListView());
                }
                else return NotFound();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar grupos de usuários: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }

        }
        [HttpGet("GetAllToTable")]
        public IActionResult GetAllToTable()
        {
            try
            {
                Utils utils = new();
                List<UserGroupDisplayViewModel> userGroupList = _userGroupDisplayApp.GetUserGroupListToTable();
                if (userGroupList.Any())
                {
                    return Ok(utils.ListToJson(userGroupList));
                }
                else return NotFound();

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar grupos de usuários: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }

        }



    }
}