import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public sendRequest(body): Observable<any> {
    return this.http.post(this.baseUrl + 'rent-request', body);
  }
}