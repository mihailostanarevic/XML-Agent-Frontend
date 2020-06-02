import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularSplitModule } from 'angular-split';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule, NZ_ICONS, NZ_ICON_DEFAULT_TWOTONE_COLOR } from 'ng-zorro-antd/icon';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LimitRedirectComponent } from './auth/limit-redirect/limit-redirect.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { ErrorComponent } from './pages/error/acces-denied/error.component';

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
    ErrorComponent,
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
