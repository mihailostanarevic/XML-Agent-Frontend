import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentRegistrationComponent } from './auth/agent-registration/agent-registration.component';
import { LimitRedirectComponent } from './auth/limit-redirect/limit-redirect.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AgentRentComponent } from './pages/ad/agent-rent/agent-rent.component';
import { CreateAdComponent } from './pages/ad/create-ad/create-ad.component';
import { CarBrandComponent } from './pages/create-forms/car-brand/car-brand.component';
import { CarClassComponent } from './pages/create-forms/car-class/car-class.component';
import { CarModelComponent } from './pages/create-forms/car-model/car-model.component';
import { FuelTypeComponent } from './pages/create-forms/fuel-type/fuel-type.component';
import { GearshiftTypeComponent } from './pages/create-forms/gearshift-type/gearshift-type.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorComponent } from './pages/error/acces-denied/error.component';
import { CarBrandsComponent } from './pages/lists/car-brands/car-brands.component';
import { CarClassesComponent } from './pages/lists/car-classes/car-classes.component';
import { CarModelsComponent } from './pages/lists/car-models/car-models.component';
import { FuelTypesComponent } from './pages/lists/fuel-types/fuel-types.component';
import { GearshiftTypesComponent } from './pages/lists/gearshift-types/gearshift-types.component';
import { RegistrationRequestComponent } from './pages/registration-request/registration-request.component';
import { LightSearchFormComponent } from './pages/search-forms/light-search-form/light-search-form.component';
import { AdDetailsComponent } from './pages/details/ad-details/ad-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: 'error-page', component: ErrorComponent },
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
      { path: 'search', component: LightSearchFormComponent},
      { path: ':id/ad-details', component: AdDetailsComponent},
      { path: 'agent-rent', component: AgentRentComponent},
      { path: 'create-ad', component: CreateAdComponent},
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
