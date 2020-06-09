import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
// import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularSplitModule } from 'angular-split';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
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
import { LightSearchFormComponent } from './pages/search-forms/light-search-form/light-search-form.component';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    LimitRedirectComponent,
    DashboardComponent,
    AgentRegistrationComponent,
    RegistrationRequestComponent,
    CarBrandsComponent,
    CarClassesComponent,
    CarModelsComponent,
    GearshiftTypesComponent,
    FuelTypesComponent,
    CarBrandComponent,
    CarClassComponent,
    CarModelComponent,
    GearshiftTypeComponent,
    FuelTypeComponent,
    LightSearchFormComponent,
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    NzFormModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NzIconModule,
    AngularSplitModule.forRoot(),
    CommonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' },
  { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
