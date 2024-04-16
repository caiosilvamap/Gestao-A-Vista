using AutoMapper;
using System.Linq;
using Domain.Models;
using Application.ViewModels;
using System.Runtime.CompilerServices;
using Application.ViewModels.UserViewModels;


namespace Application.AutoMappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDisplayViewModel>()
            .ForMember(
                dest => dest.UserGroupName,
                opt => opt.MapFrom(
                        src => src.UserGroupObj.Name));

            CreateMap<Document, DocumentDisplayViewModel>()
            .ForMember(
                dest => dest.UserName,
                opt => opt.MapFrom(
                    src => src.UserObj.Name))
            .ForMember(
                dest => dest.Categoria,
                opt => opt.MapFrom(
                    src => src.DocumentCategoryObj.Name
                ));


            CreateMap<User, UserViewModel>().ReverseMap();

            CreateMap<UserGroup, UserGroupViewModel>().ReverseMap();

            CreateMap<Document, DocumentViewModel>().ReverseMap();

            CreateMap<DocumentCategory, DocumentCategoryViewModel>().ReverseMap();

            CreateMap<DocumentCategory, DocumentCategoryDisplayViewModel>().ReverseMap();
        }
    }
}