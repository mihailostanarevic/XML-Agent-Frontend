import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  
  private baseUrl = environment.baseUrl;
  private requestUrl = this.baseUrl + 'ads/availability';

  constructor(private http : HttpClient) { }

  public updateCarAvailability(body): Observable<any>{
     return this.http.post(this.requestUrl, body);
  }

