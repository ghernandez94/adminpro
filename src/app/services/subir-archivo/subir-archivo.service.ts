import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    let urlTipo: string;
    switch (tipo) {
      case 'usuario':
        urlTipo = 'usuarios';
        break;
      case 'hospital':
        urlTipo = 'hospitales';
        break;
      case 'medico':
        urlTipo = 'medicos';
        break;
      default:
        console.log('El tipo de imagen no existe.');
        return;
    }

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }

        }
      };

      const url = `${URL_SERVICIOS}/upload/${urlTipo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });

  }
}
