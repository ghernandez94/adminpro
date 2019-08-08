import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient,
              private router: Router,
              private subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  login(usuario: Usuario, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
    .pipe(
      map( (resp: any ) => {
        this.guardarStorage(resp.token, resp.data);
        return true;
      }));
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
    .pipe(
      map( (resp: any ) => {
        this.guardarStorage(resp.token, resp.data);
        return true;
      }));
  }

  estaLogueado() {
    return ( this.token.length > 0 );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  guardarStorage(token: string, usuario: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
      .pipe(
        map( (resp: any ) => {
          swal('Usuario creado', usuario.email, 'success');
          return resp.data;
        }));
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.put( url, usuario, httpOptions)
      .pipe(
        map( (resp: any ) => {
          this.guardarStorage(this.token, resp.data);
          swal('Usuario actualizado', usuario.email, 'success');
          return true;
        }));
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.data.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(this.token, this.usuario);
      })
      .catch( err => {
        console.log(err);
      });
  }
}
