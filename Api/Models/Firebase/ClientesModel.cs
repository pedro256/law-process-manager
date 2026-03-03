using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace Api.Models.Firebase;

[FirestoreData]
public class ClientesModel
{

    [FirestoreDocumentId] // Isso diz ao Firestore para colocar o ID do doc aqui
    public string Id { get; set; }
    
    [FirestoreProperty]
    public string NomePreferido { get; set; } = string.Empty;
    [FirestoreProperty]
    public string Identidade {get;set;} = string.Empty;
    [FirestoreProperty]
    public string ContatoEmail {get;set;} = string.Empty;
    [FirestoreProperty]
    public string ContatoCelular {get;set;} = string.Empty;
    public int ClassificacaoJuridica { get;set;}

    [FirestoreProperty]
    public string Status { get; set; } = "A";

    [FirestoreProperty]
    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
}