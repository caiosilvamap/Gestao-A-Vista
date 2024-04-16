using Domain.Interfaces;
using Infra.Data;
using Infra.Repository;
using Application.Interfaces;
using Application;


namespace API_Service.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection DependenciesInjection(this IServiceCollection services)
        {
            services.AddTransient<DataContext>();


            services.AddScoped<ILoginApp, LoginApp>();
            services.AddTransient<IDocumentApp, DocumentApp>();
            services.AddTransient<IDocumentDisplayApp, DocumentDisplayApp>();
            services.AddTransient<IUserApp, UserApp>();
            services.AddTransient<IUserDisplayApp, UserDisplayApp>();
            services.AddTransient<IUserGroupApp, UserGroupApp>();
            services.AddTransient<IUserGroupDisplayApp, UserGroupDisplayApp>();
            services.AddTransient<IDocumentCategoryApp, DocumentCategoryApp>();
            services.AddTransient<IDocumentCategoryDisplayApp, DocumentCategoryDisplayApp>();


            services.AddTransient<IUserDisplayRepository, UserDisplayRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserGroupRepository, UserGroupRepository>();
            services.AddTransient<IUserGroupDisplayRepository, UserGroupDisplayRepository>();
            services.AddTransient<IDocumentRepository, DocumentRepository>();
            services.AddTransient<IDocumentDisplayRepository, DocumentDisplayRepository>();
            services.AddTransient<IDocumentCategoryRepository, DocumentCategoryRepository>();
            services.AddTransient<IDocumentCategoryDisplayRepository, DocumentCategoryDisplayRepository>();

            return services;


        }
    }
}