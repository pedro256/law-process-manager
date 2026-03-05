using Api;
using Api.Configuration;


var builder = WebApplication.CreateBuilder(args);



// Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "caminho/do/seu/arquivo.json");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();





FirebaseConfigurations.Config(builder);
DependenceInjections.Config(builder);
AuthenticationConfigurations.Config(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
