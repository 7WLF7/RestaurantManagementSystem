namespace backend.Controllers
{
    using backend.Dto.Auth;
    using backend.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly string adminEmail = "admin@restaurant.null";
        private readonly string adminPassword = "adminRestaurantMagic12";
        private readonly string jwtSecret = "SuperSecretKeyForJWT_IncaCevaAiciCaSaFieMaiLunga"; // același secret ca în Program.cs

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        //[HttpPost("login")]
        //public IActionResult Login([FromBody] LoginRequestDto dto)
        //{
        //    if (dto.Email == adminEmail && dto.Password == adminPassword)
        //    {
        //        var token = GenerateJwtToken(dto.Email);
        //        return Ok(new { token });
        //    }
        //    else
        //    {
        //        return Unauthorized("Email sau parola incorectă.");
        //    }
        //}

        //    private string GenerateJwtToken(string email)
        //    {
        //        var tokenHandler = new JwtSecurityTokenHandler();
        //        var key = Encoding.UTF8.GetBytes(jwtSecret);

        //        var claims = new[]
        //        {
        //        new Claim(ClaimTypes.Name, email),
        //        new Claim(ClaimTypes.Role, "Admin")
        //    };

        //        var tokenDescriptor = new SecurityTokenDescriptor
        //        {
        //            Subject = new ClaimsIdentity(claims),
        //            Expires = DateTime.UtcNow.AddHours(1),
        //            SigningCredentials = new SigningCredentials(
        //                new SymmetricSecurityKey(key),
        //                SecurityAlgorithms.HmacSha256Signature
        //            )
        //        };

        //        var token = tokenHandler.CreateToken(tokenDescriptor);
        //        return tokenHandler.WriteToken(token);
        //    }
        //}
        [HttpPost("register")]
        public async Task<IActionResult> RegisterClient([FromBody] RegisterRequestDto dto)
        {
            try
            {
                await _userService.RegisterClientAsync(dto);
                return Ok("Cont creat cu succes");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Doar Admin poate crea conturi de Angajat
        [HttpPost("register-employee")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RegisterEmployee([FromBody] RegisterRequestDto dto)
        {
            try
            {
                await _userService.RegisterEmployeeAsync(dto);
                return Ok("Cont angajat creat cu succes");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Login comun pentru toți utilizatorii
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            try
            {
                var token = await _userService.LoginAsync(dto);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}