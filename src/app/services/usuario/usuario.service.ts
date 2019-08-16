import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  menu: any[] = [];
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
        this.guardarStorage(resp.token, resp.data, resp.menu);
        return true;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
      }));
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
    .pipe(
      map( (resp: any ) => {
        this.guardarStorage(resp.token, resp.data, resp.menu);
        return true;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
      }));
  }

  estaLogueado() {
    return ( this.token.length > 0 );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  renovarToken() {
    const url = URL_SERVICIOS + '/login/renovartoken';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.get(url, httpOptions)
      .pipe(
        map((resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log('Token renovado');
          return true;
        }),
        catchError( err => {
          swal('Error en el login', 'No fue posible renovar el token', 'error');
          return throwError(err);
        }
      ));
  }

  guardarStorage(token: string, usuario: any, menu: any[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
      .pipe(
        map( (resp: any ) => {
          swal('Usuario creado', usuario.email, 'success');
          return resp.data;
        }),
        catchError( err => {
          console.log(err);
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
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
          if (usuario._id  === this.usuario._id) {
            this.guardarStorage(this.token, resp.data, this.menu);
          }
          swal('Usuario actualizado', usuario.email, 'success');
          return true;
        }));
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuario', id)
      .then( (resp: any) => {
        this.usuario.img = resp.data.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(this.token, this.usuario, this.menu);
      })
      .catch( err => {
        console.log(err);
      });
  }

  listarUsuarios(skip: number = 0) {
    const url = `${URL_SERVICIOS}/usuario?skip=${skip}`;
    return this.http.get( url );
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/custom/usuarios/' + termino;

    return this.http.get( url )
      .pipe(
        map((resp: any) => resp.usuarios)
      );
  }

  eliminarUsuario(idUsuario: string) {
    const url = URL_SERVICIOS + '/usuario/' + idUsuario;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.delete(url, httpOptions)
      .pipe(
        map( (resp: any) => {
          swal('¡El usuario ha sido eliminado correctamente!', resp.data.email, 'success');
          return true;
        })
      );
  }
}
