using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.DTO.Responses;

namespace Api.Service.Autenticador
{
    //pode haver várias formas de autenticação por isso a abstração
    public interface IAutenticadorService
    {
        Task<UsuarioAutenticadoResponseDTO> Criar(AutenticacaoCadastroRequestDTO dTO);
    }
}