import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { RegistrationRequestService } from 'src/app/services/registration-request.service';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  validateForm: FormGroup;

  private attempts: number;
  private storeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private message: NzMessageService,
              private fb: FormBuilder,
              private router: Router,
              private registrationRequestService: RegistrationRequestService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.email, Validators.minLength(8)]],
      password: [null, [Validators.required, ]]
    });

    const id = this.route.snapshot.params.id;
    if(id != undefined){
      const body = {
        id: id
      }
      this.registrationRequestService.approveRegistrationRequest(body).subscribe(() => {
        this.message.info('You have registred successfully!');
      },
      error => {
        this.message.info('Your activation link has expired.');
      });
    }

    // if(!isNaN(parseFloat(localStorage.getItem('hours')))){
    //   const currentTime = moment().format('HH:mm:ss');
    //   var array = currentTime.split(':');
    //   // if(Number(array[0]) - Number(localStorage.getItem('hours')) != 0 || Number(array[1]) - Number(localStorage.getItem('minutes')) == 0){
    //   if(Number(array[0]) - Number(localStorage.getItem('hours')) != 0 || Number(array[1]) - Number(localStorage.getItem('minutes')) > 2 || Number(array[1]) - Number(localStorage.getItem('minutes')) < 0){
    //     localStorage.setItem('attempts', '0');
    //   }
    // }
    // if(isNaN(parseFloat(localStorage.getItem('attempts')))){
    //   this.attempts = 0;
    //   localStorage.setItem('attempts', this.attempts.toString());
    // }else{
    //   this.attempts = Number(localStorage.getItem('attempts'));
    // }
    // if(Number(localStorage.getItem('attempts')) >=3){
    //   this.router.navigateByUrl('auth/limit-redirect');
    // }
  }

  submitForm(): void {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      this.store.dispatch(new AuthActions.LoginStart({
        email: this.validateForm.value.username,
        password: this.validateForm.value.password
      }));
  }

  onRegistration() {
    this.router.navigateByUrl('auth/registration');
  }

  ngOnDestroy() {
    if(this.storeSubscription){
      this.storeSubscription.unsubscribe();
    }
  }
}
