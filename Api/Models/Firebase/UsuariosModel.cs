using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Google.Cloud.Firestore;

namespace Api.Models.Firebase;

[FirestoreData]
public class UsuariosModel
{
    [FirestoreDocumentId]
    public string Id { get; set; } = string.Empty;
    
    [FirestoreProperty]
    public string Nome { get; set; } = string.Empty;
    [FirestoreProperty]
    public string Email {get;set;} = string.Empty;
    [FirestoreProperty]
    public string Phone {get;set;} = string.Empty;

    [FirestoreProperty]
    public string Status { get; set; } = "A";

    [FirestoreProperty]
    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
}