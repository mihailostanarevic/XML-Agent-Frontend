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
import { CarBrandComponent } from './pages/create-forms/car-brand/car-brand.component';
import { CarClassComponent } from './pages/create-forms/car-class/car-class.component';
import { CarModelComponent } from './pages/create-forms/car-model/car-model.component';
import { GearshiftTypeComponent } from './pages/create-forms/gearshift-type/gearshift-type.component';
import { FuelTypeComponent } from './pages/create-forms/fuel-type/fuel-type.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/login/:id/simple-user', component: LoginComponent },
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
      { path: 'car-brand', component: CarBrandComponent},
      { path: 'car-class', component: CarClassComponent},
      { path: 'car-model', component: CarModelComponent},
      { path: 'gearshift-type', component: GearshiftTypeComponent},
      { path: 'fuel-type', component: FuelTypeComponent},

      { path: ':id/car-brand', component: CarBrandComponent},
      { path: ':id/car-class', component: CarClassComponent},
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