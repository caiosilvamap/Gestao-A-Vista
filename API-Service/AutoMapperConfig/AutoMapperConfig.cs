using AutoMapper;
using Application.AutoMappers;
using Microsoft.Extensions.DependencyInjection;

namespace API_Service.AutoMapperConfig
{
    public static class AutoMapperConfig
    {
        public static IServiceCollection AddAutoMapperConfiguration(this IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(mc => { mc.AddProfile(new AutoMapperProfile()); });



            var mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);



            return services;
        }
    }
}
