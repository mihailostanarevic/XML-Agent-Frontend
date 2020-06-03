import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getRegistrationRequests(): Observable<any> {
    return this.http.get(this.baseUrl + 'auth/registration-requests');
  }

  public approveRegistrationRequest(body): Observable<any> {
    return this.http.put(this.baseUrl + `auth/approve-registration-requests`, body);
  }

  public denyRegistrationRequest(body): Observable<any> {
    return this.http.put(this.baseUrl + `auth/deny-registration-requests`, body);
  }
}
