using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO.Responses;

public class ClienteItemResponseDTO
{
    public string Id {get;set;}  = string.Empty;
    public string NomePreferido { get; set; } = string.Empty;
    public string Identidade { get; set; } = string.Empty;
    public string ContatoEmail { get; set; } = string.Empty;
    public string ContatoCelular { get; set; } = string.Empty;
    public int ClassificacaoJuridica { get; set; }
    public string Status { get; set; } = "A";
}