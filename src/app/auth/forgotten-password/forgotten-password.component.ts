import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.email, Validators.minLength(8)]],
      favoriteSportsClub: [null, [Validators.required]],
      theBestChildhoodFriendsName: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    
    this.authService.forgottenPassword(this.validateForm.value).subscribe(() => {
      this.message.info('You will recieve email with your new password.');
      this.router.navigateByUrl('auth/login');
    }, error => {
      this.message.info('Bad credentials.');
    });
  }
}
