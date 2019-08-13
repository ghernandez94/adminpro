import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  cargando = true;
  totalRegistros: number;

  constructor(private hospitalService: HospitalService,
    private modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.finish
      .subscribe((res) => {
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.listarHospitales()
      .subscribe((resp: any) => {
        this.hospitales = resp.data;
        this.totalRegistros = resp.total;
        this.cargando = false;
      });
  }

  crearHospital() {
    swal({
      title: 'Nuevo Hospital',
      text: 'Nombre:',
      buttons: true,
      content: 'input'
    })
      .then((value) => {
        if (value) {
          this.hospitalService.crearHospital(value)
            .subscribe(resp => {
              this.cargarHospitales();
              swal('¡Hospital creado correctamente!', resp.nombre, 'success');
            });
        }
      });
  }

  buscarHospital(termino: string) {
    if (termino.trim().length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this.hospitalService.buscarHospitales(termino)
      .subscribe((resp: Hospital[]) => {
        this.hospitales = resp;
        this.cargando = false;
      });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((eliminar: boolean) => {
        if (eliminar) {
          this.hospitalService.eliminarHospital(hospital._id)
            .subscribe(() => this.cargarHospitales());
        }
      });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  cambiarImagen(id: string, img: string) {
    const tipo = 'hospital';
    this.modalUploadService.show.emit({ id, img, tipo });
  }
}
