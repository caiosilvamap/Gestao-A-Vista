
using Application.Interfaces;
using Application.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API_Service.Controllers
{

    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]

    public class DocumentCategoryController : Controller
    {
        private readonly IDocumentCategoryApp _documentCategoryApp;
        private readonly IDocumentCategoryDisplayApp _documentCategoryDisplayApp;

        public DocumentCategoryController(IDocumentCategoryApp documentCategoryApp, IDocumentCategoryDisplayApp documentCategoryDisplayApp)
        {
            _documentCategoryApp = documentCategoryApp;
            _documentCategoryDisplayApp = documentCategoryDisplayApp;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddDocumentCategory([FromForm] DocumentCategoryViewModel docCategoryView)
        {
            try
            {
                return Ok(await _documentCategoryApp.CreateAsync(docCategoryView));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao adicionar categoria de documento: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> EditUser([FromForm] DocumentCategoryViewModel documentCategoryView)
        {
            try
            {
                return Ok(await _documentCategoryApp.EditAsync(documentCategoryView));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao alterar categoria de documento: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpGet("GetAllToTable")]
        public IActionResult GetAllToTable()
        {
            Utils utils = new();

            try
            {
                List<DocumentCategoryDisplayViewModel> documentCategoryList = _documentCategoryDisplayApp.GetDocumentCategoryDisplayView();
                if (documentCategoryList.Any())
                {
                    return Ok(utils.ListToJson(documentCategoryList));
                }
                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar categorias de documentos: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });

            }
        }

        [HttpGet("GetById")]
        public IActionResult GetById (int id)
        {
            try
            {
                var docCategoryView = _documentCategoryApp.FindIdNoTrackingAsync(id).Result;

                if (docCategoryView != null)
                {
                    return Ok(docCategoryView);
                }
                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar categoria: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpGet("GetAllToSelect")]
        public IActionResult GetAllToSelect()
        {

            try
            {
                List<DocumentCategoryViewModel> documentCategoryList = _documentCategoryApp.GetDocumentCategoryListToSelect();
                if (documentCategoryList.Any())
                {
                    return Ok(documentCategoryList);
                }
                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar categorias de documentos: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });

            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteUser(int Id)
        {
            try
            {
                var deleteDocCategory = await _documentCategoryApp.FindIdNoTrackingAsync(Id);

                if (deleteDocCategory != null)
                {
                    await _documentCategoryApp.DeleteAsync(deleteDocCategory);
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
