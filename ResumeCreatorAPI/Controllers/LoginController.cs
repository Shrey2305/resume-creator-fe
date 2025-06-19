using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using ResumeCreatorAPI.Interface;
using ResumeCreatorAPI.Model;

namespace ResumeCreatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogin _service;

        public LoginController(ILogin service)
        {
            _service = service;
        }

        //[HttpPost("login")]
        //public async Task<ActionResult<Login>> GetUser([FromBody] Login request)
        //{
        //    var user = await _service.GetUser(request.Username, request.Password);

        //    if (user == null)
        //        return Unauthorized("Invalid credentials");

        //    return Ok(user);
        //}
        [HttpPost("login")]
        public async Task<IActionResult> GetUser(Login login)
        {
            var user = await _service.GetUser(login);

            if (user == null)
                return Unauthorized("Invalid username or password");

            return Ok($"Welcome back, {user.UserName}!");
        }

        [HttpPost("registration")]
        public async Task<ActionResult<Registration>> AddUser([FromBody] Registration request)
        {
            var user = await _service.AddUser(request.Name, request.UserName, request.Email, request.Password);

            if (user == null)
                return BadRequest(new { message = "User already exists" });

            return Ok(user);
        }

    }
}
