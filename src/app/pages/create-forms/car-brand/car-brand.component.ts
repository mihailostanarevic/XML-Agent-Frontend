import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CarBrandService } from 'src/app/services/car-brand.service';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.css']
})
export class CarBrandComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;

  constructor(private message: NzMessageService, private fb: FormBuilder, private router: Router, private carBrandService: CarBrandService) {}

  ngOnInit(): void {
    this.isValid = true;
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      this.carBrandService.createCarBrand(this.validateForm.value).subscribe(() => {
        this.message.info('You have successfully created car brand.');
      }
        , error => {
        this.message.info('Please check your data again. You have entered pre-existing data.');
      }
      );
    }
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.rePassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

}
