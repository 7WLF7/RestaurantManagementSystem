﻿namespace backend.Dto.Auth
{
    public class RegisterRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public string Username { get; set; } = string.Empty;
    }
}
