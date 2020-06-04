import { Component, OnInit } from '@angular/core';
import { CarModelService } from 'src/app/services/car-model.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-car-models',
  templateUrl: './car-models.component.html',
  styleUrls: ['./car-models.component.css']
})
export class CarModelsComponent implements OnInit {

  listOfData = [];

  constructor(private carModelService: CarModelService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.carModelService.getAllCarModels().subscribe(data => {
      this.listOfData = data;
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    })
  }

  delete(id): void {
    this.carModelService.deleteCarModel(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car class.');
    })
  }

}
