import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;

  constructor(private message: NzMessageService, private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isValid = true;
    this.validateForm = this.fb.group({
      username: ['', [Validators.email, Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      rePassword: ['', [Validators.required, this.confirmationValidator]],
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      country: ['', [Validators.required, Validators.minLength(4)]],
      ssn: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
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
