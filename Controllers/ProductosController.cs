using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaVentasAPI.Data;
using SistemaVentasAPI.Models;

namespace SistemaVentasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductos()
        {
            var productos = await _context.Productos.ToListAsync();
            return Ok(productos);
        }

        [HttpPost]
        public async Task<IActionResult> CrearProducto(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();
            return Ok(producto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditarProducto(int id, Producto producto)
        {
            var prod = await _context.Productos.FindAsync(id);

            if (prod == null)
                return NotFound();

            prod.Nombre = producto.Nombre;
            prod.Descripcion = producto.Descripcion;
            prod.Precio = producto.Precio;
            prod.Stock = producto.Stock;

            await _context.SaveChangesAsync();
            return Ok(prod);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarProducto(int id)
        {
            var prod = await _context.Productos.FindAsync(id);

            if (prod == null)
                return NotFound();

            _context.Productos.Remove(prod);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}