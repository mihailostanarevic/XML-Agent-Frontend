import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public trackCar(body): Observable<any> {
    return this.http.post(this.baseUrl + 'gps', body);
  }

  public trackableCars(id): Observable<any> {
    return this.http.get(this.baseUrl + `gps/trackable-cars/${id}/agent`);
  }

  public trackedCars(id): Observable<any> {
    return this.http.get(this.baseUrl + `gps/tracked-cars/${id}/agent`);
  }
}
