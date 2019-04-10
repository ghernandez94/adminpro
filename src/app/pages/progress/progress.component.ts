import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 25;
  progreso2: number = 50;

  constructor() { }

  ngOnInit() {
  }

  // cambiarValor(valor:number){
  //   if(valor > 0 && this.progreso >= 100){
  //     return
  //   }
  //   else if(valor < 0 && this.progreso <= 0){
  //     return
  //   }else{
  //     this.progreso = this.progreso + valor;
  //   }
  // }

}
