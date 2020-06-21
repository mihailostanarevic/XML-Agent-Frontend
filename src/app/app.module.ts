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
import { AdDetailsComponent } from './pages/details/ad-details/ad-details.component';
import * as fromApp from './store/app.reducer';
import { RegistrationComponent } from './auth/registration/registration.component';
import { CartEffects } from './cart/store/cart.effects';
import { CartComponent } from './pages/cart/cart.component';
import { AdCardComponent } from './pages/ad-card/ad-card.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AgentRequestsComponent } from './pages/request/agent-requests/agent-requests.component';
import { SimpleUserRequestsComponent } from './pages/request/simple-user-requests/simple-user-requests.component';
import { AdsWhichNeedReportComponent } from './pages/lists/ads-which-need-report/ads-which-need-report.component';
import { ReportComponent } from './pages/create-forms/report/report.component';
import { PendingCommentsComponent } from './pages/lists/pending-comments/pending-comments.component';
import { StatisticComponent } from './pages/statistic/statistic.component';

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
    AdDetailsComponent,
    CreateAdComponent,
    AgentRentComponent,
    RegistrationComponent,
    CreateAdComponent,
    CartComponent,
    AdCardComponent,
    ReservationsComponent,
    MessagesComponent,
    AgentRequestsComponent,
    SimpleUserRequestsComponent,
    AdsWhichNeedReportComponent,
    ReportComponent,
    PendingCommentsComponent,
    StatisticComponent
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
    EffectsModule.forRoot([AuthEffects, CartEffects])
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' },
  { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
