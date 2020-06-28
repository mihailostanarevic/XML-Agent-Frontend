import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducer";
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  validateForm: FormGroup;
  user: User;

  constructor(private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required, this.confirmationValidator]],
    });
    this.store.select("auth").subscribe(authData => {
      this.user = authData.user;
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    
    this.authService.changePasword(this.user.id, this.validateForm.value).subscribe(() => {
      this.message.info('Your password has been changed.');
      this.router.navigateByUrl("dashboard")
    }, error => {
      this.message.info('Bad credentials.');
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}
