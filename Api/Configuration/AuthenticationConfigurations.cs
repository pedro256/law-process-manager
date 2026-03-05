using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Api.Configuration;

public class AuthenticationConfigurations
{
    //install Microsoft.AspNetCore.Authentication.JwtBearer

    public static void Config(WebApplicationBuilder builder)
    {
        var projectIdFirebase = builder.Configuration["Firebase:ProjectId"];
        builder.Services.AddAuthentication()
        // Provedor 1: Firebase
        .AddJwtBearer("Firebase", options =>
        {
            options.Authority = "https://securetoken.google.com/"+projectIdFirebase;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = "https://securetoken.google.com/"+projectIdFirebase,
                ValidateAudience = true,
                ValidAudience = projectIdFirebase,
                ValidateLifetime = true
            };
        });
        // Provedor 2: Keycloak (Caso necessário)
        // .AddJwtBearer("Keycloak", options =>
        // {
        //     options.Authority = "https://seu-keycloak.com/realms/meu-realm";
        //     options.TokenValidationParameters = new TokenValidationParameters
        //     {
        //         ValidateIssuer = true,
        //         ValidIssuer = "https://seu-keycloak.com/realms/meu-realm",
        //         ValidateAudience = true,
        //         ValidAudience = "account", // Ou o ClientID do Keycloak
        //         ValidateLifetime = true
        //     };
        // });
        
        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("MultiAuth", policy =>
            {
                // Esta política aceita tokens de ambos os provedores
                policy.AddAuthenticationSchemes(
                    "Firebase"
                    // , "Keycloak"
                    );
                policy.RequireAuthenticatedUser();
            });
        });
    }
}
