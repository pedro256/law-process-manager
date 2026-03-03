using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;

namespace Api.Service.Usuario;

public interface IUsuarioService
{
    Task CriarUsuario(CriarUsuarioRequestDTO request);
}