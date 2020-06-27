import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  validateForm: FormGroup;
  isValid: boolean;
  htmlTagRegExp = '^(?!<.+?>).*$';
  // @ViewChild('username', {static: true}) username: ElementRef;
  // @ViewChild('password', {static: true}) password: ElementRef;
  // @ViewChild('firstName', {static: true}) firstName: ElementRef;
  // @ViewChild('lastName', {static: true}) lastName: ElementRef;
  // @ViewChild('address', {static: true}) address: ElementRef;
  // @ViewChild('city', {static: true}) city: ElementRef;
  // @ViewChild('country', {static: true}) country: ElementRef;
  // @ViewChild('ssn', {static: true}) ssn: ElementRef;

  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private store: Store<fromApp.AppState>,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.isValid = true;
    this.validateForm = this.fb.group({
      username: ['', [Validators.email, Validators.required, Validators.minLength(8), Validators.pattern(this.htmlTagRegExp)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{9,}'), Validators.pattern(this.htmlTagRegExp)]],
      rePassword: ['', [Validators.required, this.confirmationValidator, Validators.pattern(this.htmlTagRegExp)]],
      firstName: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.htmlTagRegExp)]],
      lastName: ['', [Validators.required, Validators.pattern(this.htmlTagRegExp)]],
      address: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.htmlTagRegExp)]],
      city: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.htmlTagRegExp)]],
      country: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.htmlTagRegExp)]],
      favoriteSportsClub: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.htmlTagRegExp)]],
      theBestChildhoodFriendsName: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.htmlTagRegExp)]],
      ssn: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(this.htmlTagRegExp)]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    // this.store.dispatch(new AuthActions.SignupStart({
    //   username: this.username.nativeElement.value,
    //   password: this.password.nativeElement.value,
    //   firstName: this.firstName.nativeElement.value,
    //   lastName: this.lastName.nativeElement.value,
    //   address: this.address.nativeElement.value,
    //   city: this.city.nativeElement.value,
    //   country: this.country.nativeElement.value,
    //   ssn: this.ssn.nativeElement.value
    // }));
    {
      this.authService.registerSimpleUser(this.validateForm.value).subscribe(() => {
        this.message.info('You have successfully sent your registration request.');
        this.router.navigateByUrl('auth/login');
      }
        , error => {
        this.message.info('Please check your data again. You have entered pre-existing data.');
      }
      );
    }
  }

  agentRegister(): void {
    this.router.navigateByUrl(`auth/agent-registration`);
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

}
