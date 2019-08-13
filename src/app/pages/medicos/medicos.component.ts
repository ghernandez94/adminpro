import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  cargando = true;
  totalRegistros: number;

  constructor(private medicoService: MedicoService,
    private modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();

    this.modalUploadService.finish
      .subscribe((res) => {
        this.cargarMedicos();
      });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.listarMedicos()
      .subscribe((resp: any) => {
        this.medicos = resp.data;
        this.totalRegistros = resp.total;
        this.cargando = false;
      });
  }

  buscarMedico(termino: string) {
    if (termino.trim().length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this.medicoService.buscarMedicos(termino)
      .subscribe((resp: Medico[]) => {
        this.medicos = resp;
        this.cargando = false;
      });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar el médico ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((eliminar: boolean) => {
        if (eliminar) {
          this.medicoService.eliminarMedico(medico._id)
            .subscribe(() => this.cargarMedicos());
        }
      });
  }

  editarMedico(medico: Medico) {
  }

  cambiarImagen(id: string, img: string) {
    const tipo = 'medico';
    this.modalUploadService.show.emit({ id, img, tipo });
  }
}
