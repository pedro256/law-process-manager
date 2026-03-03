using FirebaseAdmin.Auth;
using Api.DTO.Request;
using Api.DTO.Responses;

namespace Api.Service.Autenticador.Firebase;

public class AutenticadorFirebaseService : IAutenticadorService
{
    public async Task<UsuarioAutenticadoResponseDTO> Criar(AutenticacaoCadastroRequestDTO dTO)
    {
        var userArgs = new UserRecordArgs
        {
            Email = dTO.Email,
            Password = dTO.Senha,
            DisplayName = dTO.NomeVisualizacao,
            PhoneNumber = dTO.Telefone // O formato deve ser E.164 (ex: +55...)
        };

        UserRecord userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(userArgs);
        return new UsuarioAutenticadoResponseDTO
        {
            Id = userRecord.Uid
        };
    }
}