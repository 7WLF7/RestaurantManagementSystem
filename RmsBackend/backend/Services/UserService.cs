using backend.Data;
using backend.Dto.Auth;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly string _jwtSecret = "SuperSecretKeyForJWT_IncaCevaAiciCaSaFieMaiLunga";

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<string> LoginAsync(LoginRequestDto dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u=> u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.ParolaHash))
            {
                throw new Exception("Invalid credentials!");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSecret);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Rol.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task RegisterClientAsync(RegisterRequestDto dto)
        {
            if(await _context.Users.AnyAsync(u => u.Email== dto.Email))
            {
                throw new Exception("Emailul deja exista!");
            }

            var user = new User
            {
                Email = dto.Email,
                ParolaHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Nume=dto.Username,
                Rol = Rol.Client
            };
           await _context.Users.AddAsync(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // aici poți loga ex.Message și ex.InnerException?.Message
                throw new Exception($"Save failed: {ex.Message} - Inner: {ex.InnerException?.Message}");
            }
        }

        public async Task RegisterEmployeeAsync(RegisterRequestDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                throw new Exception("Emailul deja exista!");

            var user = new User
            {
                Email = dto.Email,
                ParolaHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Rol = Rol.Angajat
            };
            _context.Users.Add(user);
           await _context.SaveChangesAsync();
        }
    }
}

