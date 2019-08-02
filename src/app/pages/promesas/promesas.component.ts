import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then(
        msj => console.log('Terminó!', msj)
    )
    .catch(error => console.error('Error en la promesa', error));
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      const interval = setInterval( () => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

  ngOnInit() {
  }

}
