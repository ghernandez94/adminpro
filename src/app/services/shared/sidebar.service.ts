import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(private usuarioService: UsuarioService) {}

  get menu(): any[] {
    return this.usuarioService.menu;
  }
}
