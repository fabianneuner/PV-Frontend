import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.sass']
})
export class PowerComponent implements OnInit {
  powers = [];
  constructor(private apiService: ApiService) { }

  updateIntervall = 1;
  datum: string;
  maxValues = 20;

  chartOptions = {
    responsive: true,
    animation: { duration: 0}
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(0,65,113,0.05)',
      borderColor: 'rgba(0,65,113,0.6)',
      pointBackgroundColor: 'rgba(0,65,113,0.6)',
      pointBorderColor: 'rgba(0,65,113,0.8)',
      pointHoverBackgroundColor: 'rgba(0,65,113,0.6)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  powerChart: any[] = [{ data: [] }];

  chartLabels: any[] = [{ data: [] }];

  ngOnInit() {
    this.apiService.get().subscribe((data: any[]) => {
      console.log(data);
      this.powers = data;
      this.chartInit();
    });
  }

  async chartInit() {
    let count = 0;
    let start = 0;

    while (1) {
      await this.delay(this.updateIntervall * 1000);

      start = count - this.maxValues;
      if (start < 0) {
        start = 0;
      }

      this.powerChart = [
        { data:  this.getPowerArray(start, count), label: 'Power' }
      ];

      count = +count + +this.updateIntervall;

      this.chartLabels = this.getDatumArray(start, count);
    }
  }

  getPowerArray(start, count) {
    const array: number[] = [];
    for (const m of this.powers) {
      array.push(m);
    }
    return array.slice(start, count);
  }

  getDatumArray(start, count) {
    const array: number[] = [];
    for (let i = start; i < count - 1; i++) {
      array.push(i);
    }
    return array;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
