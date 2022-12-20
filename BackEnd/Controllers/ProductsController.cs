using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Produts.api.Data;
using Produts.api.Models;

namespace Produts.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsContext _context;

        public ProductsController(ProductsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getProducts()
        {
            return Ok(await _context.Products.ToListAsync());
        }


        [HttpPost]
        public async Task<ActionResult> Post(Product product)
        {
           await _context.Products.AddAsync(product);
           await _context.SaveChangesAsync();
           return Ok(product);
        }


        [HttpPut]
        public async Task<ActionResult> Put(Product product)
        {
            var dbproduct =await _context.Products.FindAsync(product.Id);

            if (dbproduct == null) return NotFound();

            dbproduct.Name = product.Name;
            dbproduct.Price = product.Price;
            dbproduct.Category = product.Category;
         
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(Guid Id)
        {
            var dbproduct = await _context.Products.FindAsync(Id);

            if (dbproduct == null) return NotFound();
             _context.Products.Remove(dbproduct);
            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}
