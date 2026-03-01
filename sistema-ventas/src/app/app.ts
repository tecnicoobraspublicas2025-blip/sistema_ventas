import { Component } from '@angular/core';
import { Productos } from './productos/productos';
import { Clientes } from './clientes/clientes';
import { Ventas } from './ventas/ventas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Productos, Clientes, Ventas],
  template: `
    <app-productos></app-productos>
    <hr>
    <app-clientes></app-clientes>
    <hr>
    <app-ventas></app-ventas>
  `
})
export class App {}