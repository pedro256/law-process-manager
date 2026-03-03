using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.DTO.Responses;
using Api.Repositories.Base;

namespace Api.Service.Clientes;

public class ClientService : IClientService
{
    public IClienteRepository clienteRepository;

    public ClientService(
        IClienteRepository clienteRepository
    )
    {
        this.clienteRepository = clienteRepository;
    }

    public async Task CriarCliente(CriarClientRequestDTO request)
    {
        await clienteRepository.AdicionarAsync(request);
    }
    public async Task<IEnumerable<ClienteItemResponseDTO>> ListarTodos()
    {
        return await clienteRepository.ObterTodosAsync();
    }
}