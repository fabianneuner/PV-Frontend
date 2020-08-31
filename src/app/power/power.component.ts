import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.sass']
})
export class PowerComponent implements OnInit {
  powers = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.get().subscribe((data: any[]) => {
      console.log(data);
      this.powers = data;
    });
  }

}
