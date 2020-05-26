import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/registration', component: RegistrationComponent}

  ];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }