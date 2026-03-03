using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.DTO.Responses;

namespace Api.Service.Autenticador.Keycloak
{
    public class AutenticadorKeycloakService : IAutenticadorService
    {
        public async Task<UsuarioAutenticadoResponseDTO> Criar(AutenticacaoCadastroRequestDTO dTO)
        {
            // criar usuário no keycloak
            // throw new NotImplementedException();
            var retorno = new UsuarioAutenticadoResponseDTO
            {
                Id = "00000"
            };
            return retorno;  
        }
    }
}