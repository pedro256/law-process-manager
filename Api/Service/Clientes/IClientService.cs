using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.DTO.Responses;

namespace Api.Service.Clientes;

public interface IClientService
{
    Task CriarCliente(CriarClientRequestDTO request);

    Task<IEnumerable<ClienteItemResponseDTO>> ListarTodos();
}