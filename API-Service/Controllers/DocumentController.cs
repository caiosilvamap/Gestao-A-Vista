using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.ViewModels;
using Microsoft.AspNetCore.Cors;


namespace API_Service.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : Controller
    {
        private IDocumentApp _documentApp;
        private IUserApp _userApp;
        private IDocumentDisplayApp _documentDisplayApp;

        public DocumentController(IDocumentApp documentApp, IUserApp userApp, IDocumentDisplayApp documentDisplayApp)
        {
            _documentDisplayApp = documentDisplayApp;
            _documentApp = documentApp;
            _userApp = userApp;
        }

        [HttpGet("GetDocumentsCarouselByUser")]
        public IActionResult GetDocumentsCarouselByUser(int userId)
        {

            try
            {
                List<DocumentViewModel> documentsList = _documentApp.GetUserDocument(userId);

                if (documentsList.Any())
                {
                    return Ok(documentsList);
                }

                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar documento: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpGet("GetDocumentsByUserListToJson")]
        public IActionResult GetDocumentsByUserListToJson(int userId)
        {
            Utils utils = new();

            try
            {
                List<DocumentDisplayViewModel> documentsList = _documentDisplayApp.GetUserDocumentDisplayView(userId);

                if (documentsList.Any())
                {
                    return Ok(utils.ListToJson(documentsList));
                }

                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar documento: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }


        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            Utils utils = new();

            try
            {
                List<DocumentDisplayViewModel> documentList = _documentDisplayApp.GetDocumentDisplayView();

                if (documentList.Any())
                {
                    return Ok(utils.ListToJson(documentList));
                }

                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar documentos: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }


        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            try
            {
                var documentView = _documentApp.FindIdNoTrackingAsync(id).Result;

                if (documentView != null)
                {
                    return Ok(documentView);
                }
                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao buscar documento: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }


        [HttpPost("Upload")]
        public async Task<IActionResult> UploadDocument([FromForm] DocumentViewModel documentView)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var successCreate = await _documentApp.CreateAsync(documentView);

                    if (successCreate != null)
                    {
                        var userName = _userApp.FindIdNoTrackingAsync(documentView.UserId).Result.UserName;

                        var documentLastAdd = await _documentApp.FindIdNoTrackingAsync(_documentApp.GetLastId());

                        if (documentView.File != null)
                        {
                            var pathsFile = _documentApp.CreateFileDirectory(userName, documentView.File);
                            documentLastAdd.PathFile = pathsFile.PathFileDirectory;
                            documentLastAdd.PathFileCarousel = pathsFile.PathFileCarousel;
                        }

                        var pathsSlide = _documentApp.CreateSlideDirectory(userName, documentView.Slide);

                        documentLastAdd.PathSlide = pathsSlide.PathSlideDirectory;

                        documentLastAdd.PathSlideCarousel = pathsSlide.PathSlideCarousel;

                        var success = await _documentApp.EditAsync(documentLastAdd);

                        if (success != null) return Ok(true);
                    }

                    return BadRequest();
                }

                else return BadRequest();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao fazer upload dos documentos: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpPost("Edit")]
        public async Task<IActionResult> EditDocument([FromForm] DocumentViewModel documentView)
        {
            try
            {
                var documentDB = await _documentApp.FindIdNoTrackingAsync(documentView.Id);

                var userName = _userApp.FindIdNoTrackingAsync(documentDB.UserId).Result.UserName;

                documentView.CreationDate = documentDB.CreationDate;

                if (documentView.File != null && documentDB.File == null)
                {
                    var pahtsFile = _documentApp.EditFileDirectory(userName, documentView.File, documentView.Id);
                    documentView.PathFile = pahtsFile.PathFileDirectory;
                    documentView.PathFileCarousel = pahtsFile.PathFileCarousel;
                }

                if (documentView.File != null && documentDB.File != null)
                {
                    System.IO.File.Delete(documentDB.PathFile);

                    var pathsFile = _documentApp.EditExistingFileDirectory(documentDB.PathFile, documentDB.PathFileCarousel, documentView.File);

                    documentView.PathFile = pathsFile.PathFileDirectory;

                    documentView.PathFileCarousel = pathsFile.PathFileCarousel;

                }

                if (documentView.File == null)
                {
                    documentView.PathFile = documentDB.PathFile;
                    documentView.PathFileCarousel = documentDB.PathFileCarousel;

                }

                if (documentView.Slide != null)
                {
                    System.IO.File.Delete(documentDB.PathSlide);

                    var pathsSlide = _documentApp.EditSlideDirectory(documentDB.PathSlide, documentDB.PathSlideCarousel, documentView.Slide);

                    documentView.PathSlide = pathsSlide.PathSlideDirectory;

                    documentView.PathSlideCarousel = pathsSlide.PathSlideCarousel;
                }

                else
                {
                    documentView.PathSlide = documentDB.PathSlide;
                    documentView.PathSlideCarousel = documentDB.PathSlideCarousel;
                }

                await _documentApp.EditAsync(documentView);
                return Ok(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao Editar documento: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }


        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteDocument(int idDocument)
        {
            try
            {
                var deleteDocument = await _documentApp.FindIdNoTrackingAsync(idDocument);

                if (deleteDocument != null)
                {
                    if (System.IO.File.Exists(deleteDocument.PathFile))
                    {
                        System.IO.File.Delete(deleteDocument.PathFile);
                    }
                    if (System.IO.File.Exists(deleteDocument.PathSlide))
                    {
                        System.IO.File.Delete(deleteDocument.PathSlide);
                    }

                    await _documentApp.DeleteAsync(deleteDocument);

                    return Ok(true);
                }

                else return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao Excluir documento: {ex.Message}");
                return StatusCode(500, new { ErrorMessage = "Ocorreu um erro ao processar a solicitação." });
            }
        }
    }

}