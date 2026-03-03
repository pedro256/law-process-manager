using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.Service.Usuario;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuarioController(IUsuarioService usuarioService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CriarUsuarioRequestDTO request)
        {
            await usuarioService.CriarUsuario(request);
            return Created();
        }
    }
}