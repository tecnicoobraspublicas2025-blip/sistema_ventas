using System.ComponentModel.DataAnnotations.Schema;

public class Venta
{
    [Column("venta_id")]
    public int VentaId { get; set; }

    [Column("cliente_id")]
    public int ClienteId { get; set; }

    [Column("producto_id")]
    public int ProductoId { get; set; }

    [Column("cantidad")]
    public int Cantidad { get; set; }

    [Column("fecha")]
    public DateTime Fecha { get; set; }

    [Column("total")]
    public decimal Total { get; set; }

    public Cliente? Cliente { get; set; }
    public Producto? Producto { get; set; }
}