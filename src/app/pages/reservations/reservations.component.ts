import { Component, OnInit } from '@angular/core';
import { CarAccessory } from 'src/app/shared/carAccessory.model';
import { CarAccessoriesService } from 'src/app/services/car-accessories.service';
import { CarService } from 'src/app/services/car.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    
  }
}
