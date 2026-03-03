using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.DTO.Responses;

namespace Api.Repositories.Base;


public interface IClienteRepository
{
    Task<IEnumerable<ClienteItemResponseDTO>> ObterTodosAsync();
    Task<ClienteDetailsReponseDTO?> ObterPorIdAsync(int id);
    Task AdicionarAsync(CriarClientRequestDTO cliente);
    Task AtualizarAsync(CriarClientRequestDTO cliente);
    Task DeletarAsync(int id);
}