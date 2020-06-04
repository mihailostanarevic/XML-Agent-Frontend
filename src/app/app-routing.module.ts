import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LimitRedirectComponent } from './auth/limit-redirect/limit-redirect.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgentRegistrationComponent } from './auth/agent-registration/agent-registration.component';
import { RegistrationRequestComponent } from './pages/registration-request/registration-request.component';
import { CarBrandsComponent } from './pages/lists/car-brands/car-brands.component';
import { CarClassesComponent } from './pages/lists/car-classes/car-classes.component';
import { CarModelsComponent } from './pages/lists/car-models/car-models.component';
import { GearshiftTypesComponent } from './pages/lists/gearshift-types/gearshift-types.component';
import { FuelTypesComponent } from './pages/lists/fuel-types/fuel-types.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/registration', component: RegistrationComponent},
  // { path: 'auth/agent-registration', component: AgentRegistrationComponent},
  { path: 'auth/limit-redirect', component: LimitRedirectComponent},

  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'agent-registration', component: AgentRegistrationComponent},
      { path: 'registration-requests', component: RegistrationRequestComponent},
      { path: 'car-brands', component: CarBrandsComponent},
      { path: 'car-classes', component: CarClassesComponent},
      { path: 'car-models', component: CarModelsComponent},
      { path: 'gearshift-types', component: GearshiftTypesComponent},
      { path: 'fuel-types', component: FuelTypesComponent},
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