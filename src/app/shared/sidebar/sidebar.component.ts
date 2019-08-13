import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  constructor( public _sidebar: SidebarService, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  public get usuario(): Usuario {
    return this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

}
