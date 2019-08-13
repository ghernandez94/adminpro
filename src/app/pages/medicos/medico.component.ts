import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '', '', '', '');

  constructor(
    private medicoService: MedicoService,
    private hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalUpload: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.listarHospitales()
      .subscribe( (resp: any) => this.hospitales = resp.data);

    this.modalUpload.finish
      .subscribe( (resp: any) => this.medico.img = resp.data.img);
  }

  cargarMedico(id: string) {
    this.medicoService.obtenerMedico(id)
      .subscribe(medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
  }

  guardarMedico(myForm: NgForm) {
    if (myForm.invalid) {
      return;
    }

    if (this.medico._id) {
      // Actualizar
      this.medicoService.actualizarMedico(this.medico)
        .subscribe();
    } else {
      // Crear
      this.medicoService.crearMedico(this.medico)
        .subscribe( (medico: Medico) => {
          this.medico._id = medico._id;
          this.router.navigate(['medico', medico._id]);
        });
    }
  }

  cambioHospital(id: string) {
    this.hospitalService.obtenerHospital(id)
      .subscribe( hospital => this.hospital = hospital);
  }

  cambiarFoto() {
    this.modalUpload.mostrar(this.medico._id, this.medico.img, 'medico');
  }

}
