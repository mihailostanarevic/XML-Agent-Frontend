import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularSplitModule } from 'angular-split';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule, NZ_ICONS, NZ_ICON_DEFAULT_TWOTONE_COLOR } from 'ng-zorro-antd/icon';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgentRegistrationComponent } from './auth/agent-registration/agent-registration.component';
import { LimitRedirectComponent } from './auth/limit-redirect/limit-redirect.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthEffects } from './auth/store/auth.effects';
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
import * as fromApp from './store/app.reducer';
import { RegistrationComponent } from './auth/registration/registration.component';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LimitRedirectComponent,
    DashboardComponent,
    ErrorComponent,
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
    CreateAdComponent,
    AgentRentComponent,
    RegistrationComponent,
    CreateAdComponent
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
    CommonModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' },
  { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
