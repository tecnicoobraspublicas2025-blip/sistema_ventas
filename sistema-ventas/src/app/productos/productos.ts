import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos implements OnInit {

  productos: any[] = [];

  nuevo: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  };

  private apiUrl = 'http://localhost:5115/api/productos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => {
        this.productos = data;
      });
  }

  guardar() {
    this.http.post(this.apiUrl, this.nuevo)
      .subscribe(() => {
        this.nuevo = { nombre:'', descripcion:'', precio:0, stock:0 };
        this.cargar();
      });
  }
}