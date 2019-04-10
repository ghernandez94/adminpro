import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit { 
  @ViewChild('txtProgress') txtProgress:ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output()  cambioValor : EventEmitter<number> = new EventEmitter();
  
  constructor() { 
    //console.log(this.leyenda)
    //console.log(this.progreso)
  }

  ngOnInit() {
    //console.log(this.leyenda)
    //console.log(this.progreso)
  }

  onChanges(newValue: number){
    this.setProgreso(newValue);
    this.txtProgress.nativeElement.value = this.progreso;
  }

  cambiarValor(valor:number){
    this.setProgreso(this.progreso + valor);
    this.txtProgress.nativeElement.focus();
  }

  setProgreso(newValue:number){
    if(newValue > 100){
      this.progreso = 100;
    }else if(newValue < 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
      this.cambioValor.emit(this.progreso);
    }
  }

}
