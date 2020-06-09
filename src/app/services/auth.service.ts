import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;
  private baseUrl = environment.baseUrl;

  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient) { }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration)
  }

  clearLogoutTimer() {
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  public registerAgent(body): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/create-agent', body);
  }
}
