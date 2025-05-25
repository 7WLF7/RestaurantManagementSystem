using backend.Dto.Auth;

namespace backend.Interfaces
{
    public interface IUserService
    {
        Task RegisterClientAsync(RegisterRequestDto dto);
        Task RegisterEmployeeAsync(RegisterRequestDto dto);  // va fi apelată doar de admin
        Task<string> LoginAsync(LoginRequestDto dto);
    }
}
