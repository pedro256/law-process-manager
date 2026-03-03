using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Repositories.Base;
using Api.Repositories.Firebase;
using Api.Service.Autenticador;
using Api.Service.Autenticador.Firebase;
using Api.Service.Clientes;
using Api.Service.Usuario;

namespace Api
{
    public class DependenceInjections
    {

        public static void Config(WebApplicationBuilder builder)
        {
            #region CONTEXTS
            // builder.Services.AddDbContext<ApplicationDbContext>(options =>
            //     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
            // );
            #endregion


            #region ENTITIES
            // builder.Services.AddScoped<IGenericRepository<UserEntity>, GenericRepository<UserEntity>>();
            #endregion

            #region REPOSITORIES
            builder.Services.AddScoped<IClienteRepository, ClienteFirebaseRepository>();
            builder.Services.AddScoped<IUsuarioRepository, UsuarioFirebaseRepository>();
            #endregion

            #region SERVICES
            builder.Services.AddScoped<IAutenticadorService,AutenticadorFirebaseService>();
            builder.Services.AddScoped<IClientService, ClientService>();
            builder.Services.AddScoped<IUsuarioService,UsuarioService>();
        
            #endregion

            #region HTTP CLIENTS
            // builder.Services.AddHttpClient<IKeycloakService, KeycloakService>();
            #endregion

        }
    }
}