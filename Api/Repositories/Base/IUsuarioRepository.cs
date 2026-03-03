using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;

namespace Api.Repositories.Base;

public interface IUsuarioRepository
{
    Task AdicionarAsync(CriarUsuarioRequestDTO cliente);
}