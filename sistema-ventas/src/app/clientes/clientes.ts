import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class Clientes implements OnInit {

  clientes: any[] = [];

  nuevo: any = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };

  private apiUrl = 'http://localhost:5115/api/clientes';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => {
        this.clientes = data;
      });
  }

  guardar() {
    this.http.post(this.apiUrl, this.nuevo)
      .subscribe(() => {
        this.nuevo = { nombre:'', apellido:'', email:'', telefono:'' };
        this.cargar();
      });
  }
}