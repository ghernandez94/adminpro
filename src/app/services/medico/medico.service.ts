import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  listarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url);
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/custom/medicos/' + termino;

    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.medicos)
      );
  }

  crearMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.usuarioService.token
      })
    };

    return this.http.post(url, medico, httpOptions)
      .pipe(
        map((resp: any) => {
          swal('Médico creado correctamente', medico.nombre, 'success');
          return resp.data;
        }));
  }

  actualizarMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico/' + medico._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.usuarioService.token
      })
    };

    return this.http.put(url, medico, httpOptions)
      .pipe(
        map(() => {
          swal('Médico actualizado correctamente', medico.nombre, 'success');
          return true;
        }));
  }

  eliminarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.usuarioService.token
      })
    };

    return this.http.delete(url, httpOptions)
      .pipe(
        map((resp: any) => {
          swal('¡El médico ha sido eliminado correctamente!', resp.data.nombre, 'success');
          return true;
        })
      );
  }

  obtenerMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.usuarioService.token
      })
    };

    return this.http.get(url, httpOptions)
      .pipe(
        map( (resp: any) => {
          return resp.data;
        })
      );
  }
}
