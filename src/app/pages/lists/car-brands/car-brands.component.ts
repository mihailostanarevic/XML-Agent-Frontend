import { Component, OnInit } from '@angular/core';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.css']
})
export class CarBrandsComponent implements OnInit {

  listOfData = [];

  constructor(private carBrandService: CarBrandService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.carBrandService.getAllCarBrands().subscribe(data => {
      this.listOfData = data;
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    })
  }

  delete(id): void {
    this.carBrandService.deleteCarBrand(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car brand.');
    })
  }

}
