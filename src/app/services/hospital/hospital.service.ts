import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  // borrarHospital(	id:	string	):	Recibe	un	ID	de	un	hospital	y	lo	borra
  // crearHospital(	nombre:	string	):	Recibe	el	nombre	del	hospital	y	lo	crea.
  // buscarHospital(	termino:	string	):	Recibe	el	término	de	búsqueda
  //    y	retorna	todos	los	hospitales	que	coincidan	con	ese	término	de	búsqueda.
  // actualizarHospital(	hospital:	Hospital	):	Recibe	un	hospital	y	lo	actualiza.

  listarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get( url );
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/hospitales/' + termino;

    return this.http.get( url )
      .pipe(
        map((resp: any) => resp.hospitales)
      );
  }

  crearHospital(nombre: string) {
    const hospital = new Hospital(nombre);
    const url = URL_SERVICIOS + '/hospital';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.usuarioService.token
      })
    };

    return this.http.post( url, hospital, httpOptions )
    .pipe(
      map( (resp: any ) => {
        swal('Hospital creado correctamente', hospital.nombre, 'success');
        return resp.data;
      }));
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.usuarioService.token
      })
    };

    return this.http.put( url, hospital, httpOptions)
    .pipe(
      map( () => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      }));
  }

  eliminarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.usuarioService.token
      })
    };

    return this.http.delete(url, httpOptions)
      .pipe(
        map( (resp: any) => {
          swal('¡El hospital ha sido eliminado correctamente!', resp.data.nombre, 'success');
          return true;
        })
      );
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
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
