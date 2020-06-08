import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { RegistrationRequestService } from 'src/app/services/registration-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  private attempts: number;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private fb: FormBuilder, private router: Router, private registrationRequestService: RegistrationRequestService, private authService: AuthService) { }

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

    if(!isNaN(parseFloat(localStorage.getItem('hours')))){
      const currentTime = moment().format('HH:mm:ss');
      var array = currentTime.split(':');
      // if(Number(array[0]) - Number(localStorage.getItem('hours')) != 0 || Number(array[1]) - Number(localStorage.getItem('minutes')) == 0){
      if(Number(array[0]) - Number(localStorage.getItem('hours')) != 0 || Number(array[1]) - Number(localStorage.getItem('minutes')) > 2 || Number(array[1]) - Number(localStorage.getItem('minutes')) < 0){
        localStorage.clear();
      }
    }
    if(isNaN(parseFloat(localStorage.getItem('attempts')))){
      this.attempts = 0;
    }else{
      this.attempts = Number(localStorage.getItem('attempts'));
    }
    if(Number(localStorage.getItem('attempts')) >=3){
      this.router.navigateByUrl('auth/limit-redirect');
    }
  }

  submitForm(): void {
    if(Number(localStorage.getItem('attempts')) >=3){
      const currentTime = moment().format('HH:mm:ss');
      var array = currentTime.split(':');
      localStorage.setItem('hours', array[0]);
      localStorage.setItem('minutes', array[1]);
      this.router.navigateByUrl('auth/limit-redirect');
    }
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      this.authService.login(this.validateForm.value).subscribe(data => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigateByUrl(`dashboard`);
      }, error => {
        this.message.info('Bad credentials.');
        this.attempts = this.attempts + 1;
        localStorage.setItem('attempts', this.attempts.toString());
      });
    }
  }

  onRegistration() {
    this.router.navigateByUrl('auth/registration');
  }
}
