using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Api.DTO.Request;

public class CriarUsuarioRequestDTO
{

    [Required(ErrorMessage = "O nomeCompleto é obrigatório.")]
    [StringLength(150, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 150 caracteres.")]
    public string NomeCompleto{ get; set; } = string.Empty;

    [Required(ErrorMessage = "O e-mail de contato é obrigatório.")]
    [EmailAddress(ErrorMessage = "O e-mail informado não é válido.")]
    public string ContatoEmail { get; set; } = string.Empty;

    [Required(ErrorMessage = "O celular de contato é obrigatório.")]
    [Phone(ErrorMessage = "O formato do celular é inválido.")]
    public string ContatoCelular { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
    public string Senha { get; set; } = string.Empty;

    public string IdAuth {get;set;} = string.Empty;


}