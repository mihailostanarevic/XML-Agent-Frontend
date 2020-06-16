import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsersReservedRequests(id): Observable<any> {
    let queryParam = {
      params: new HttpParams().set("status", "RESERVED")
    }
    
    return this.http.get(this.baseUrl + `users/${id}/requests`, queryParam);
  }
}
