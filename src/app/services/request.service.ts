import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = environment.baseUrl;
  activeUserToken: string;
  subscriptionUser: Subscription;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) {
      this.subscriptionUser = store.select('auth').subscribe(userData => {
        this.activeUserToken = userData.user.token;
      })
  }

  public sendRequest(body): Observable<any> {
    return this.http.post(this.baseUrl + 'rent-request', body);
  }

  public getRequests(body): Observable<any> {
    console.log(this.activeUserToken);
    return this.http.get(this.baseUrl + 'users/'+body.id+'/requests/'+body.requestStatus, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }
}
