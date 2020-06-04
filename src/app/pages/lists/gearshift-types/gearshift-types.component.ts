import { Component, OnInit } from '@angular/core';
import { GearshiftTypeService } from 'src/app/services/gearshift-type.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-gearshift-types',
  templateUrl: './gearshift-types.component.html',
  styleUrls: ['./gearshift-types.component.css']
})
export class GearshiftTypesComponent implements OnInit {

  listOfData = [];

  constructor(private gearshiftTypeService: GearshiftTypeService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.gearshiftTypeService.getAllGearshiftTypes().subscribe(data => {
      this.listOfData = data;
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    })
  }

  delete(id): void {
    this.gearshiftTypeService.deleteGearshiftType(id).subscribe(() => {
      this.setupData();
      this.message.info('You have successfully deleted car class.');
    })
  }

}
