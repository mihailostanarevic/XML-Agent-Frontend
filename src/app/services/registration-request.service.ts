import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestService {

  private baseUrl = environment.baseUrl;
  subscriptionUser: Subscription;
  activeUserToken: string;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public getRegistrationRequests(): Observable<any> {
    this.getToken();
    return this.http.get(this.baseUrl + 'auth/registration-requests', {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public confirmRegistrationRequest(body): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `auth/confirm-registration-request`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public approveRegistrationRequest(body): Observable<any> {
    return this.http.put(this.baseUrl + `auth/approve-registration-request`, body);
  }

  public denyRegistrationRequest(body): Observable<any> {
    this.getToken();
    return this.http.put(this.baseUrl + `auth/deny-registration-request`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  getToken(): void {
    this.subscriptionUser = this.store.select('auth').subscribe(userData => {
      this.activeUserToken = userData.user.token;
    });
  }
}
