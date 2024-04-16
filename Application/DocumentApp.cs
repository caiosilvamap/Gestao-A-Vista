using Application.Interfaces;
using Domain.Models;
using Domain.Interfaces;
using Application.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace Application
{
    public class DocumentApp : App<DocumentViewModel, Document>, IDocumentApp
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IMapper _mapper;

        public DocumentApp(IDocumentRepository documentRepository, IMapper mapper) : base(mapper, documentRepository)
        {
            _documentRepository = documentRepository;
            _mapper = mapper;
        }

        public string GetParentDirectory(string directoryPath, int levels)
        {
            string parentDirectory = directoryPath;
            for (int i = 0; i < levels; i++)
            {
                parentDirectory = Directory.GetParent(parentDirectory)?.FullName;
                if (parentDirectory == null)
                {
                    return null;
                }
            }
            return parentDirectory;
        }

        public int GetLastId()
        {
            try
            {
                return _documentRepository.FindLastAsync().Result.Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao encontrar", ex);
            }

        }

        public FilePaths CreateFileDirectory(string userName, IFormFile file)
        {
            var nameFolder = userName;

            string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;

            string pathGestaoAVista = GetParentDirectory(baseDirectory, 5);

            string publicDirectory = Path.Combine(pathGestaoAVista, "ui-gestaoavista", "public");

            var rootFileFolder = Path.Combine(publicDirectory, "File");

            if (!Directory.Exists(rootFileFolder))
            {
                Directory.CreateDirectory(rootFileFolder);
            }

            var nameFileFolder = Path.Combine(rootFileFolder, nameFolder);


            if (!Directory.Exists(nameFileFolder))
            {
                Directory.CreateDirectory(nameFileFolder);
            }

            var pathFileDirectory = Path.Combine(nameFileFolder, $"{GetLastId()}{Path.GetExtension(file.FileName)}");
            var pathFileCarousel = Path.Combine("File", userName, $"{GetLastId()}{Path.GetExtension(file.FileName)}");

            using (var fileStream = new FileStream(pathFileDirectory, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }

            return new FilePaths { PathFileCarousel = pathFileCarousel, PathFileDirectory = pathFileDirectory };
        }

        public FilePaths EditFileDirectory(string userName, IFormFile file, int documentId)
        {
            var nameFolder = userName;

            string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;

            string pathGestaoAVista = GetParentDirectory(baseDirectory, 5);

            string publicDirectory = Path.Combine(pathGestaoAVista, "ui-gestaoavista", "public");

            var rootFileFolder = Path.Combine(publicDirectory, "File");

            if (!Directory.Exists(rootFileFolder))
            {
                Directory.CreateDirectory(rootFileFolder);
            }

            var nameFileFolder = Path.Combine(rootFileFolder, nameFolder);


            if (!Directory.Exists(nameFileFolder))
            {
                Directory.CreateDirectory(nameFileFolder);
            }

            var pathFileDirectory = Path.Combine(nameFileFolder, $"{documentId}{Path.GetExtension(file.FileName)}");
            var pathFileCarousel = Path.Combine("File", userName, $"{documentId}{Path.GetExtension(file.FileName)}");

            using (var fileStream = new FileStream(pathFileDirectory, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }

            return new FilePaths { PathFileCarousel = pathFileCarousel, PathFileDirectory = pathFileDirectory };
        }

        public FilePaths EditExistingFileDirectory(string pathFileDB, string pathFileCarouselDB, IFormFile file)
        {
            var pathFileNoExtension = Path.GetFileNameWithoutExtension(pathFileDB);

            var newPathFileDirectory = Path.Combine(Path.GetDirectoryName(pathFileDB), $"{pathFileNoExtension}{Path.GetExtension(file.FileName)}");

            var newPathFileCarousel = Path.Combine(Path.GetDirectoryName(pathFileCarouselDB), $"{pathFileNoExtension}{Path.GetExtension(file.FileName)}");

            using (var fileStream = new FileStream(newPathFileDirectory, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }

            return new FilePaths { PathFileCarousel = newPathFileCarousel, PathFileDirectory = newPathFileDirectory };
        }

        public FilePaths EditSlideDirectory(string pathSlideDB, string pathSlideCarouselDB, IFormFile slide)
        {
            var pathSlideNoExtension = Path.GetFileNameWithoutExtension(pathSlideDB);

            var newPathSlideDirectory = Path.Combine(Path.GetDirectoryName(pathSlideDB), $"{pathSlideNoExtension}{Path.GetExtension(slide.FileName)}");

            var newPathSlideCarousel = Path.Combine(Path.GetDirectoryName(pathSlideCarouselDB), $"{pathSlideNoExtension}{Path.GetExtension(slide.FileName)}");

            using (var fileStream = new FileStream(newPathSlideDirectory, FileMode.Create))
            {
                slide.CopyTo(fileStream);
            }

            return new FilePaths { PathSlideCarousel = newPathSlideCarousel, PathFileDirectory = newPathSlideDirectory };
        }

        public FilePaths CreateSlideDirectory(string userName, IFormFile slide)
        {
            var nameFolder = userName;

            string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;

            string pathGestaoAVista = GetParentDirectory(baseDirectory, 5);

            string publicDirectory = Path.Combine(pathGestaoAVista, "ui-gestaoavista", "public");

            var rootSlideFolder = Path.Combine(publicDirectory, "Slide");

            if (!Directory.Exists(rootSlideFolder))
            {
                Directory.CreateDirectory(rootSlideFolder);
            }

            var nameSlideFolder = Path.Combine(rootSlideFolder, nameFolder);

            if (!Directory.Exists(nameSlideFolder))
            {
                Directory.CreateDirectory(nameSlideFolder);
            }

            var pathSlideDirectory = Path.Combine(nameSlideFolder, $"{GetLastId()}{Path.GetExtension(slide.FileName)}");
            var pathSlideCarousel = Path.Combine("Slide", userName, $"{GetLastId()}{Path.GetExtension(slide.FileName)}");


            using (var fileStream = new FileStream(pathSlideDirectory, FileMode.Create))
            {
                slide.CopyTo(fileStream);
            }

            return new FilePaths { PathSlideCarousel = pathSlideCarousel, PathSlideDirectory = pathSlideDirectory };
        }

        public List<DocumentViewModel> GetUserDocument(int userId)
        {
            try
            {
                var documentList = WhereAsync(x => x.Active && (x.UserId == userId && !x.IsPublic || x.IsPublic)).Result.ToList();

                return documentList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao Buscar documentos", ex);
            }
        }

        public override async Task<DocumentViewModel> CreateAsync(DocumentViewModel documentView)
        {
            try
            {
                var documentModel = _mapper.Map<Document>(documentView);
                documentModel.CreationDate = DateTime.UtcNow.AddHours(-3);
                await _documentRepository.CreateAsync(documentModel);
                return documentView;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new ApplicationException("Erro ao adicionar usuário", ex);
            }
        }
    }
}
