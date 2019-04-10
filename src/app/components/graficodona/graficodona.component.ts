import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: []
})
export class GraficodonaComponent implements OnInit {

  @Input() public labels: Label[] = ['Test 1', 'Test 2', 'Test 3'];
  @Input() public data: any = [100, 200, 100];
  @Input() public type: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
