import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarModelService } from './../../../services/car-model.service';
import { GearshiftTypeService } from './../../../services/gearshift-type.service';
import { FuelTypeService } from './../../../services/fuel-type.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  checked = true;     // limitedDistance
  checked1 = true;     // cdw
  value1?: string;    //Basic usage1
  value2?: string;    //Basic usage2
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  value = '';   // input number
  title = 'Input a number of child seats';
  carModelList: [];
  gearshiftTypeList: [];
  fuelTypeList: [];

  constructor(private carModelService: CarModelService,
              private gearshiftTypeService: GearshiftTypeService,
              private fuelTypeService: FuelTypeService) { }

  ngOnInit(): void {
    this.carModelService.getAllCarModels().subscribe(data => {
      this.carModelList = data;
    }, error => {
      console.log(error.error.message);
    });

    this.fuelTypeService.getAllFuelTypes().subscribe(data => {
      this.fuelTypeList = data;
    }, error => {
      console.log(error.error.message);
    });

    this.gearshiftTypeService.getAllGearshiftTypes().subscribe(data => {
      this.gearshiftTypeList = data;
    }, error => {
      console.log(error.error.message);
    })
  }

  log(data: string): void {
    console.log(data);
  }


  onChange(value: string): void {
    this.updateValue(value);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement!.nativeElement.value = this.value;
    this.updateTitle();
  }

  updateTitle(): void {
    this.title = (this.value !== '-' ? this.formatNumber(this.value) : '-') || 'Input a number';
  }

  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }
}
