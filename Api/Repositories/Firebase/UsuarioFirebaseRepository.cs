using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.Models.Firebase;
using Api.Repositories.Base;
using Google.Cloud.Firestore;

namespace Api.Repositories.Firebase;

public class UsuarioFirebaseRepository: IUsuarioRepository
{

    private readonly FirestoreDb _firestoreDb;
    private const string CollectionName = "clientes";

    public UsuarioFirebaseRepository(FirestoreDb db)
    {
        _firestoreDb = db;

    }
    public async Task AdicionarAsync(CriarUsuarioRequestDTO usuarioRequestDTO)
    {
        UsuariosModel model = new UsuariosModel();
        
        model.Id = usuarioRequestDTO.IdAuth;//id igual do autenticacao
        model.Nome = usuarioRequestDTO.NomeCompleto;
        model.Phone = usuarioRequestDTO.ContatoEmail;
        model.Email = usuarioRequestDTO.ContatoEmail;

        DocumentReference docRef = _firestoreDb.Collection(CollectionName).Document(usuarioRequestDTO.IdAuth);
        // O Firestore gera o ID automaticamente se você não passar um
        await docRef.SetAsync(model);
    }
}