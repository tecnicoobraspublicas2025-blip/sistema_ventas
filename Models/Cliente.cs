using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaVentasAPI.Models
{
    public class Cliente
    {
        [Key]
        [Column("cliente_id")]
        public int ClienteId { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Apellido { get; set; } = string.Empty;

        public string? Email { get; set; }

        public string? Telefono { get; set; }
    }
}