using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.Service.Clientes;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;


[ApiController]
[Route("api/clientes")]
public class ClienteController(IClientService clientService) : ControllerBase
{
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CriarClientRequestDTO request)
    {
        await clientService.CriarCliente(request);
        return Created();
    }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await clientService.ListarTodos());
}