import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAdService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAllCarModels(body): Observable<any> {
    return this.http.post(this.baseUrl + 'car-models', body);
  }

  public postAd(body): Observable<any> {
    return this.http.post(this.baseUrl + 'ads', body);
  }
}
