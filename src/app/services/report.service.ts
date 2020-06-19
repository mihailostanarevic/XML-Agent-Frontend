import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  public writeReport(body, id) : Observable<any>{
    return this.http.post(this.baseUrl + `reports/${id}/request-ad`, body);
  }

  public getAllRequestAdsWhichNeedReport(id) : Observable<any>{
    return this.http.get(this.baseUrl + `reports/possible/${id}/agent`);
  }

  public getStatisticByAgent(id) : Observable<any>{
    return this.http.get(this.baseUrl + `reports/statistic/${id}/agent`);
  }
}
