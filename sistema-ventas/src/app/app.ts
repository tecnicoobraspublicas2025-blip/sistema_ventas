import { Component } from '@angular/core';
import { Productos } from './productos/productos';
import { Clientes } from './clientes/clientes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Productos, Clientes],
  template: `
    <app-productos></app-productos>
    <hr>
    <app-clientes></app-clientes>
  `
})
export class App {}