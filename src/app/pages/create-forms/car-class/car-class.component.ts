import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CarClassService } from 'src/app/services/car-class.service';

@Component({
  selector: 'app-car-class',
  templateUrl: './car-class.component.html',
  styleUrls: ['./car-class.component.css']
})
export class CarClassComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;

  constructor(private message: NzMessageService, private fb: FormBuilder, private router: Router, private carClassService: CarClassService) {}

  ngOnInit(): void {
    this.isValid = true;
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      this.carClassService.createCarClass(this.validateForm.value).subscribe(() => {
        this.message.info('You have successfully created car class.');
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
