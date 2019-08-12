import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public show = new EventEmitter();
  public finish = new EventEmitter();

  constructor() { }
}
