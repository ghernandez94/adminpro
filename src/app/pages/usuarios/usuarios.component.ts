import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  skip = 0;
  limit: number;
  totalRegistros: number;
  cargando = true;

  constructor(private usuarioService: UsuarioService,
              private modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.finish
      .subscribe( (resp) => {
        // Si cambia la imagen del usuario logueado, actualiza el local storage.
        if ( this.usuarioService.usuario._id === resp.data._id ) {
          this.usuarioService.guardarStorage(this.usuarioService.token, resp.data, this.usuarioService.menu);
        }

        this.cargarUsuarios();
      });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.listarUsuarios(this.skip)
      .subscribe( (resp: any) => {
        this.usuarios = resp.data;
        this.totalRegistros = resp.total;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.skip + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.skip += valor;
    this.cargarUsuarios();
  }

  buscarUsuario (termino: string) {
    if (termino.trim().length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino)
      .subscribe( (resp: Usuario[]) => {
        this.usuarios = resp;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar el usuario ' + usuario.email,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((eliminar: boolean) => {
      if (eliminar) {
         this.usuarioService.eliminarUsuario(usuario._id)
         .subscribe( () => this.cargarUsuarios());
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

  cambiarImagen(id: string, img: string) {
    const tipo = 'usuario';
    this.modalUploadService.mostrar(id, img, tipo);
  }
}
