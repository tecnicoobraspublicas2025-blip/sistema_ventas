using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaVentasAPI.Data;
using SistemaVentasAPI.Models;

namespace SistemaVentasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VentasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ventas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentas()
        {
            return await _context.Ventas
                .Include(v => v.Cliente)
                .Include(v => v.Producto)
                .ToListAsync();
        }

        // POST: api/ventas
        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta(Venta venta)
        {
            var producto = await _context.Productos.FindAsync(venta.ProductoId);

            if (producto == null)
                return BadRequest("Producto no existe");

            if (producto.Stock < venta.Cantidad)
                return BadRequest("Stock insuficiente");

            // Calcular total automáticamente
            venta.Total = producto.Precio * venta.Cantidad;

            // Descontar stock
            producto.Stock -= venta.Cantidad;

            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            return Ok(venta);
        }
    }
}