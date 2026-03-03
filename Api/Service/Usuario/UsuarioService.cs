using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO.Request;
using Api.Repositories.Base;
using Api.Service.Autenticador;
using FirebaseAdmin.Auth;

namespace Api.Service.Usuario;

public class UsuarioService(
    IUsuarioRepository usuarioRepository,
    IAutenticadorService autenticadorService
    ) : IUsuarioService
{
    public async Task CriarUsuario(CriarUsuarioRequestDTO request)
    {
        try
        {
            var Autenticado = await autenticadorService.Criar(new AutenticacaoCadastroRequestDTO
            {
                Email = request.ContatoEmail,
                NomeVisualizacao = request.NomeCompleto,
                Senha = request.Senha,
                Telefone = request.ContatoCelular
            });
            request.IdAuth = Autenticado.Id;

            await usuarioRepository.AdicionarAsync(request);
        }
        catch (FirebaseAuthException ex)
        {
            // O código do erro fica em ex.AuthErrorCode ou ex.ErrorCode
            switch (ex.AuthErrorCode)
            {
                case AuthErrorCode.EmailAlreadyExists:
                    throw new Exception("Este e-mail já está em uso por outra conta.");
                case AuthErrorCode.PhoneNumberAlreadyExists:
                    throw new Exception("Este número de celular já está cadastrado.");
                // case AuthErrorCode.InvalidPassword:
                //     throw new Exception("A senha informada não atende aos requisitos de segurança.");
                default:
                    throw new Exception($"Erro na autenticação: {ex.Message}");
            }
        }
    }
}