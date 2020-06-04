import { Component, OnInit } from '@angular/core';
import { CarClassService } from 'src/app/services/car-class.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-car-classes',
  templateUrl: './car-classes.component.html',
  styleUrls: ['./car-classes.component.css']
})
export class CarClassesComponent implements OnInit {

  listOfData = [];

  constructor(private carClassService: CarClassService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.carClassService.getAllCarClasses().subscribe(data => {
      this.listOfData = data;
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    })
  }

  delete(id): void {
    this.carClassService.deleteCarClass(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car class.');
    })
  }

}
