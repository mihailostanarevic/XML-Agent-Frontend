import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  private attempts: number;

  constructor(private route: ActivatedRoute, private message: NzMessageService, private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.email, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
    });
    if(!isNaN(parseFloat(localStorage.getItem('hours')))){
      const currentTime = moment().format('HH:mm:ss');
      var array = currentTime.split(':');
      if(Number(array[0]) - Number(localStorage.getItem('hours')) != 0 || Number(array[1]) - Number(localStorage.getItem('minutes')) > 2 || Number(array[1]) - Number(localStorage.getItem('minutes')) < 0){
        localStorage.clear();
      }
    }
    if(isNaN(parseFloat(localStorage.getItem('attempts')))){
      this.attempts = 0;
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
      this.authService.login(this.validateForm.value).subscribe(() => {
        console.log(this.validateForm.value);
      }, error => {
        console.log(error.error.message)
        this.attempts = this.attempts + 1;
        localStorage.setItem('attempts', this.attempts.toString());
      });
    }
  }

  onRegistration() {
    this.router.navigateByUrl('auth/registration');
  }
}
