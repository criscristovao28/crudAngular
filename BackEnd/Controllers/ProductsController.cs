using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Produts.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public async Task<ActionResult> getProducts()
        {
            return null;
        }
    }
}
