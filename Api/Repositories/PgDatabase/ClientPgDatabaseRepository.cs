using Api.DTO.Request;
using Api.DTO.Responses;
using Api.Repositories.Base;

namespace Api.Repositories.PgDatabase;

/***
    AQUI CASO MUDE DE BASE DE DADOS POSTGRESQL ELE ADAPTA NESSE TRECHO SEM 
    ALTERAR A REGRA DE NEGÓCIO NO SERVICE
***/
public class ClientPgDatabaseRepository : IClienteRepository
{
    public Task AdicionarAsync(CriarClientRequestDTO cliente)
    {
        throw new NotImplementedException();
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

    public Task<IEnumerable<ClienteItemResponseDTO>> ObterTodosAsync()
    {
        throw new NotImplementedException();
    }
}