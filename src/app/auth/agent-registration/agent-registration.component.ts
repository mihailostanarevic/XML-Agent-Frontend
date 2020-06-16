import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import {differenceInCalendarDays} from 'date-fns';


@Component({
  selector: 'app-agent-registration',
  templateUrl: './agent-registration.component.html',
  styleUrls: ['./agent-registration.component.css']
})
export class AgentRegistrationComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;
  htmlTagRegExp = '^(?!<.+?>).*$';

  constructor(private message: NzMessageService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.isValid = true;
    this.validateForm = this.fb.group({
      username: ['', [Validators.email, Validators.required, Validators.minLength(8), Validators.pattern(this.htmlTagRegExp)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{9,}'), Validators.pattern(this.htmlTagRegExp)]],
      rePassword: ['', [Validators.required, this.confirmationValidator, Validators.pattern(this.htmlTagRegExp)]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.htmlTagRegExp)]],
      bankAccountNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(18), Validators.pattern(this.htmlTagRegExp)]],
      tin: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(this.htmlTagRegExp)]],
      dateFoundend: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      const body = {
        username: this.validateForm.value.username,
        password: this.validateForm.value.password,
        rePassword: this.validateForm.value.rePassword,
        name: this.validateForm.value.name,
        bankAccountNumber: this.validateForm.value.bankAccountNumber,
        tin: this.validateForm.value.tin,
        dateFounded: moment(this.validateForm.value.dateFoundend).format('YYYY/MM/DD')
      }
      this.authService.registerAgent(body).subscribe(() => {
        this.message.info('You have successfully sent your registration request.');
      }
        , error => {
        this.message.info('Please check your data again. You have entered pre-existing data.');
      }
      );
    }
  }

  backToLogin(): void {
    this.router.navigateByUrl('auth/login');
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

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(new Date(), current) < 0;
  };

}
