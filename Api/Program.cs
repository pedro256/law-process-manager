using Api;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;

var builder = WebApplication.CreateBuilder(args);



// Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "caminho/do/seu/arquivo.json");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// FIREBASE CONFIG

string jsonPath = Path.Combine(AppContext.BaseDirectory, "firebase-config.json");
Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", jsonPath);
var serviceAccountCredential = CredentialFactory.FromFile<ServiceAccountCredential>(jsonPath);
GoogleCredential credential = serviceAccountCredential.ToGoogleCredential();
FirebaseApp.Create(new AppOptions()
{
    Credential = credential
});
var projectId = builder.Configuration["Firebase:ProjectId"];
builder.Services.AddSingleton(s => FirestoreDb.Create(projectId));




DependenceInjections.Config(builder);

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
