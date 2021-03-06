import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenExpirationTimer: any;
  private baseUrl = environment.baseUrl;
  subscriptionUser: Subscription;
  activeUserToken: string;

  constructor(private store: Store<fromApp.AppState>,
              private http: HttpClient) { }

  // treba koristiti parametar 'expirationDuration', a ne hardcode timer (ali iz nekog razloga ne radi setTimeout() sa tim parametrom)
  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, 3600000);
  }

  clearLogoutTimer() {
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  public registerAgent(body): Observable<any> {
    this.getToken();
    return this.http.post(this.baseUrl + 'auth/create-agent', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public createAddres(body): Observable<any> {
    this.getToken();
    return this.http.post(this.baseUrl + 'addresses', body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public registerSimpleUser(body): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/create-simple-user', body);
  }

  public loggingLimit(): Observable<any> {
    return this.http.get(this.baseUrl + `auth/logging-limit`);
  }

  public forgottenPassword(body): Observable<any> {
    return this.http.put(this.baseUrl + `auth/forgotten-password`, body);
  }

  getToken(): void {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
  }

  public changePasword(id, data) : Observable<any>{
    console.log(id);
    console.log(data);
    return this.http.put(this.baseUrl + `auth/${id}/new-password`, data);
  }
}
