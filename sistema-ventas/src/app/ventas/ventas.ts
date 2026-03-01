import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.css']
})
export class Ventas implements OnInit {

  ventas: any[] = [];
  clientes: any[] = [];
  productos: any[] = [];

  nueva: any = {
    clienteId: 0,
    productoId: 0,
    cantidad: 1
  };

  apiVentas = 'http://localhost:5115/api/ventas';
  apiClientes = 'http://localhost:5115/api/clientes';
  apiProductos = 'http://localhost:5115/api/productos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarTodo();
  }

  cargarTodo() {
    this.http.get<any[]>(this.apiClientes)
      .subscribe(data => this.clientes = data);

    this.http.get<any[]>(this.apiProductos)
      .subscribe(data => this.productos = data);

    this.cargarVentas();
  }

  cargarVentas() {
    this.http.get<any[]>(this.apiVentas)
      .subscribe(data => this.ventas = data);
  }

  guardar() {
    if (!this.nueva.clienteId || !this.nueva.productoId) {
      alert("Seleccione cliente y producto");
      return;
    }

    this.http.post(this.apiVentas, this.nueva)
      .subscribe(() => {
        this.nueva = { clienteId: 0, productoId: 0, cantidad: 1 };
        this.cargarTodo();
      });
  }
}