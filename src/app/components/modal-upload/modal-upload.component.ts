import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from 'src/app/services/service.index';
declare var $: any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;
  id: string;
  img = 'xxx';
  tipo: string;
  imagenSubir: File;
  imagenTemp: string;

  constructor(private modalUploadService: ModalUploadService,
              private subirArchivoService: SubirArchivoService) { }

  ngOnInit() {
    this.modalUploadService.show.subscribe( ( data: any ) => {
      // Reset imagenes
      this.imagenSubir = null;
      this.imagenTemp = '';
      this.inputFile.nativeElement.value = '';

      this.id = data.id;
      this.img = data.img;
      this.tipo = data.tipo;
      this.show();
    });
  }

  show() {
    $('#exampleModal').modal('show');
  }

  hide() {
    $('#exampleModal').modal('hide');
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image')) {
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = (reader.result as string);
  }

  cambiarImagen() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.tipo, this.id)
      .then( resp => {
        this.modalUploadService.finish.emit(resp);
        this.hide();
      });
  }
}
