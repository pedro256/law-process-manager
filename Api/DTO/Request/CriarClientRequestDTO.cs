using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Api.DTO.Request;

public class CriarClientRequestDTO
{
    [Required(ErrorMessage = "O nome preferido é obrigatório.")]
    [StringLength(150, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 150 caracteres.")]
    public string NomePreferido { get; set; } = string.Empty;

    [Required(ErrorMessage = "O documento de identidade (CPF/CNPJ) é obrigatório.")]
    [RegularExpression(@"^\d{11}$|^\d{14}$", ErrorMessage = "A identidade deve conter apenas números (11 para CPF ou 14 para CNPJ).")]
    public string Identidade { get; set; } = string.Empty;

    [Required(ErrorMessage = "O e-mail de contato é obrigatório.")]
    [EmailAddress(ErrorMessage = "O e-mail informado não é válido.")]
    public string ContatoEmail { get; set; } = string.Empty;

    [Required(ErrorMessage = "O celular de contato é obrigatório.")]
    [Phone(ErrorMessage = "O formato do celular é inválido.")]
    public string ContatoCelular { get; set; } = string.Empty;

    [Range(1, 2, ErrorMessage = "A classificação jurídica informada é inválida.")]
    public int ClassificacaoJuridica { get; set; }

    [Required(ErrorMessage = "O status é obrigatório.")]
    [RegularExpression(@"^[AI]$", ErrorMessage = "O status deve ser 'A' (Ativo) ou 'I' (Inativo).")]
    public string Status { get; set; } = "A";
}