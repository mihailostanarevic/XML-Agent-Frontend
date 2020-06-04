import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarClassService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createCarClass(body): Observable<any> {
    return this.http.post(this.baseUrl + 'car-classes', body);
  }

  public updateCarClass(body, id): Observable<any> {
    return this.http.put(this.baseUrl + `car-classes/${id}/car-class`, body);
  }

  public getCarClass(id): Observable<any> {
    return this.http.get(this.baseUrl + `car-classes/${id}/car-class`);
  }

  public getAllCarClasses(): Observable<any> {
    return this.http.get(this.baseUrl + `car-classes`);
  }

  public deleteCarClass(id): Observable<any> {
    return this.http.delete(this.baseUrl + `car-classes/${id}/car-class`);
  }
}
