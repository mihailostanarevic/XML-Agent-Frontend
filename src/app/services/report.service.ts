import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = environment.baseUrl;
  subscriptionUser: Subscription;
  activeUserToken: string;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) { }

  public writeReport(body, id) : Observable<any>{
    this.getToken();
    return this.http.post(this.baseUrl + `reports/${id}/request-ad`, body, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getAllRequestAdsWhichNeedReport(id) : Observable<any>{
    this.getToken();
    return this.http.get(this.baseUrl + `reports/possible/${id}/agent`, {
      headers: new HttpHeaders ({
        'Auth-Token' : this.activeUserToken
      })
    });
  }

  public getStatisticByAgent(id) : Observable<any>{
    this.getToken();
    return this.http.get(this.baseUrl + `reports/statistic/${id}/agent`, {
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
