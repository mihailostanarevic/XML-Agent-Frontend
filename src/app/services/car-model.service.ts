import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createCarModel(body): Observable<any> {
    return this.http.post(this.baseUrl + 'car-models', body);
  }

  public updateCarModel(body, id): Observable<any> {
    return this.http.put(this.baseUrl + `car-models/${id}/car-model`, body);
  }

  public getCarModel(id): Observable<any> {
    return this.http.get(this.baseUrl + `car-models/${id}/car-model`);
  }

  public getAllCarModels(): Observable<any> {
    return this.http.get(this.baseUrl + `car-models`);
  }

  public deleteCarModel(id): Observable<any> {
    return this.http.delete(this.baseUrl + `car-models/${id}/car-model`);
  }
}
