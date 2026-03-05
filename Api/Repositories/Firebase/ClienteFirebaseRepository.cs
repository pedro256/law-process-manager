using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.DTO.Responses;
using Api.Models.Firebase;
using Api.Repositories.Base;
using Google.Cloud.Firestore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Api.Repositories.Firebase;

public class ClienteFirebaseRepository : IClienteRepository
{
    private readonly FirestoreDb _firestoreDb;
    private const string CollectionName = "clientes";
    private const string UsuarioCollectionName = "usuarios";

    public ClienteFirebaseRepository(
        FirestoreDb db
        )
    {
        _firestoreDb = db;
    }

    public async Task AdicionarAsync(CriarClientRequestDTO cliente)
    {
        ClientesModel model = new ClientesModel();
        model.NomePreferido = cliente.NomePreferido;
        model.Identidade = cliente.Identidade;
        model.ContatoCelular = cliente.ContatoCelular;
        model.ContatoEmail = cliente.ContatoEmail;
        model.ClassificacaoJuridica = cliente.ClassificacaoJuridica;

        CollectionReference colRef = _firestoreDb
            .Collection(UsuarioCollectionName)
            .Document(cliente.UserId)
            .Collection(CollectionName);

        
        // O Firestore gera o ID automaticamente se você não passar um
        await colRef.AddAsync(model);
    }

    public Task AtualizarAsync(CriarClientRequestDTO cliente)
    {
        throw new NotImplementedException();
    }

    public Task DeletarAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ClienteDetailsReponseDTO?> ObterPorIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<ClienteItemResponseDTO>> GetAllClientsByUserIdAsync(string UserID)
    {
        Query query = _firestoreDb
            .Collection(UsuarioCollectionName)
            .Document(UserID)
            .Collection(CollectionName);

        QuerySnapshot snapshot = await query.GetSnapshotAsync();

        return snapshot.Documents
            .Select(d => d.ConvertTo<ClientesModel>())
            .Select(m => new ClienteItemResponseDTO
            {
                Id = m.Id,
                NomePreferido = m.NomePreferido,
                ContatoCelular = m.ContatoCelular,
                ClassificacaoJuridica = m.ClassificacaoJuridica,
                ContatoEmail = m.ContatoEmail,
                Identidade = m.Identidade,
                Status = m.Status
            })
            .ToList();
    }
}