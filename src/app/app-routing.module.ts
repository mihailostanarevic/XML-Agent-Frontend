import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimitRedirectComponent } from './auth/limit-redirect/limit-redirect.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorComponent } from './pages/error/acces-denied/error.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'error-page', component: ErrorComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/registration', component: RegistrationComponent},
  { path: 'auth/limit-redirect', component: LimitRedirectComponent},

  {
    path: 'dashboard', component: DashboardComponent, children: [

    ],

  },

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
