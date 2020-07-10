import { Component, AfterViewInit, ViewChild, ElementRef } from 
  '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { GpsService } from 'src/app/services/gps.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements AfterViewInit {

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  map: google.maps.Map;
  lat = 45.05167;
  lng = 19.83694;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
  // marker = new google.maps.Marker({
  //   position: this.coordinates,
  //   map: this.map,
  // });
  marker = [];

  private user: any;
  private helper: Number = 0;
  private intervalSetupCarsReference: any;

  constructor(private message: NzMessageService, private router: Router, private gpsService: GpsService) { }

  ngAfterViewInit() {
    this.mapInitializer();
    this.setupUser();
    this.setupCars();
    this.intervalSetupCarsReference = setInterval(() => {
      for(let i = 0;i < this.helper;i++){
        this.marker[i].setMap(null);  
       }
       this.helper = 0;
      this.setupCars();
    }, 30 * 1000);
  }

  ngOnDestroy() {
    console.log("onDestroy");
    clearInterval(this.intervalSetupCarsReference);
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    // this.marker.setMap(this.map);
   }

   private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

   setupCars(): void {
    this.gpsService.trackedCars(this.user.id).subscribe(data => {
      this.helper = data.length;
      for(let i = 0;i < data.length;i++){
        console.log(data[i].modelName);
        console.log(Number(data[i].lat));
        console.log(Number(data[i].lng));
        this.coordinates = new google.maps.LatLng(Number(data[i].lat), Number(data[i].lng));
        this.marker[i] = new google.maps.Marker({
          position: this.coordinates,
          map: this.map,
          title: 'Car: ' + data[i].brandName + ' ' + data[i].modelName + ' , Customer: ' + data[i].customer
    });
      }
    })
   }

   refresh(): void {
     for(let i = 0;i < this.helper;i++){
      this.marker[i].setMap(null);  
     }
     this.helper = 0;
     this.setupCars();
   }
}
