import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public show = new EventEmitter();
  public finish = new EventEmitter();

  constructor() { }

  mostrar(id, img, tipo) {
    this.show.emit({id, img, tipo});
  }
}
