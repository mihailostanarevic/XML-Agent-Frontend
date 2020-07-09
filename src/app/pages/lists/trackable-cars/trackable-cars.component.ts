import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { GpsService } from 'src/app/services/gps.service';

@Component({
  selector: 'app-trackable-cars',
  templateUrl: './trackable-cars.component.html',
  styleUrls: ['./trackable-cars.component.css']
})
export class TrackableCarsComponent implements OnInit {

  private user: any;
  listOfData = [];

  constructor(private message: NzMessageService, private router: Router, private gspService: GpsService) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  private setupData(): void {
    this.gspService.trackableCars(this.user.id).subscribe(data => {
      this.listOfData = data;
    })
  }

  track(carId, brandName, modelName): void {
    const body = {
      carId: carId
    }
    this.gspService.trackCar(body).subscribe(() => {
      this.message.info('You have successfully tracked ' + brandName + ' ' + modelName + '.');
      this.setupData();
    })
  }
}
