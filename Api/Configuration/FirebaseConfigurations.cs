using System;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;

namespace Api.Configuration;

public class FirebaseConfigurations
{
    public static void Config(WebApplicationBuilder builder)
    {
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
    }
}
