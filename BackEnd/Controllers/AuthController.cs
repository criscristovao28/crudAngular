using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Produts.api.Data;
using Produts.api.DTO;
using Produts.api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Produts.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
      
        private readonly ProductsContext _context;

        public AuthController(ProductsContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("createAccount")]
        public async Task<IActionResult> CreateAccount(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok( new
            {
                user = new 
                {
                    id= user.ID,
                    name = user.Name,
                    email = user.Email,
                },
                token = GenerateToke(user),
            });
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDTO login)
        {
            var user = await _context.Users.Where(q => q.Email == login.Email && q.Password == login.Password).FirstOrDefaultAsync();
            if(user==null)
                return Unauthorized();

            return Ok(new
            {
                user = new
                {
                    id = user.ID,
                    name = user.Name,
                    email = user.Email,
                },
                token = GenerateToke(user),
            });
        }

        private static string GenerateToke(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Estdfsfdsjhsdfjdshhfdfds");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //Subject = new ClaimsIdentity(new Claim[]
                //{
                //    new Claim(ClaimTypes.Name, user.Email),
                //    new Claim(ClaimTypes.Email, user.Email),
                //}),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = new SigningCredentials( new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
