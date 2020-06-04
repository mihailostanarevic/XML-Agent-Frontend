import { Component, OnInit } from '@angular/core';
import { FuelTypeService } from 'src/app/services/fuel-type.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-fuel-types',
  templateUrl: './fuel-types.component.html',
  styleUrls: ['./fuel-types.component.css']
})
export class FuelTypesComponent implements OnInit {

  listOfData = [];

  constructor(private fuelTypeService: FuelTypeService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.fuelTypeService.getAllFuelTypes().subscribe(data => {
      this.listOfData = data;
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    })
  }

  delete(id): void {
    this.fuelTypeService.deleteFuelType(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car class.');
    })
  }
  gas(gas): String {
    if(gas){
      return "has";
    }
    return "doesn't have";
  }

}
