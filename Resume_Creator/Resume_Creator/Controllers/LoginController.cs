using Microsoft.AspNetCore.Mvc;
using Resume_Creator.Interfaces;
using Resume_Creator.Models;

namespace Resume_Creator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public LoginController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Register user)
        {
            var result = await _userRepository.RegisterUserAsync(user);
            if (!result)
                return BadRequest("User already exists");

            return Ok("Registration successful");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login login)
        {
            var user = await _userRepository.ValidateUserAsync(login);

            if (user == null)
                return Unauthorized("Invalid username or password");

            return Ok($"Welcome back, {user.Username}!");
        }

    }
}
