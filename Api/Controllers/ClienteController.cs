using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Claims;
using Api.DTO.Request;
using Api.Service.Clientes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Authorize(Policy = "MultiAuth")]
[ApiController]
[Route("api/clientes")]
public class ClienteController(IClientService clientService) : ControllerBase
{

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CriarClientRequestDTO request)
    {
        request.UserId = User.GetUserId();
        await clientService.CriarCliente(request);
        return Created();
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var id = User.GetUserId();
        return Ok(await clientService.getAllByUserId(id));
    }
}