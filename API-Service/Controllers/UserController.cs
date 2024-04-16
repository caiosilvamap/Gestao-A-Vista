using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Application.ViewModels.UserViewModels;

namespace API_Service.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserApp _userApp;
        private readonly IUserDisplayApp _userDisplayApp;
        private readonly IUserGroupApp _userGroupApp;
        private readonly IMapper _mapper;
        public UserController(IUserApp userApp, IUserGroupApp userGroupApp, IMapper mapper, IUserDisplayApp userDisplayApp)
        {
            _userDisplayApp = userDisplayApp;
            _userApp = userApp;
            _userGroupApp = userGroupApp;
            _mapper = mapper;
        }


        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            Utils utils = new();

            try
            {
                if (_userDisplayApp.GetUserDisplayView().Any())
                {
                    return Ok(utils.ListToJson(_userDisplayApp.GetUserDisplayView()));
                }

                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar usuários: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }

        }

        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            try
            {
                var userView = _userApp.FindIdNoTrackingAsync(id).Result;

                if (userView != null)
                {
                    return Ok(userView);
                }
                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar usuário: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }



        [HttpPost("Add")]
        public async Task<IActionResult> AddUser([FromForm] UserViewModel userView)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(await _userApp.CreateAsync(userView));
                }

                else return BadRequest();
            }

            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao adicionar usuário: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }

        }


        [HttpPost("Edit")]
        public async Task<IActionResult> EditUser([FromForm] UserViewModel userView)
        {
            try
            {
                var userDB = await _userApp.FindIdNoTrackingAsync(userView.Id);
                userView.CreationDate = userDB.CreationDate;

                if (userDB != null)
                {
                    if (userView.Password == null)
                    {
                        userView.Password = userDB.Password;
                    }
                    await _userApp.EditAsync(userView);
                    return Ok(true);
                }
                else return NotFound();
            }

            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao Editar usuário: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteUser(int IdUser)
        {
            try
            {
                var deleteUser = await _userApp.FindIdNoTrackingAsync(IdUser);

                if (deleteUser != null)
                {
                    await _userApp.DeleteAsync(deleteUser);
                    return Ok(true);
                }

                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao Excluir usuário: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }

    }
}