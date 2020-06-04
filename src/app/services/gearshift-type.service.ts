import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GearshiftTypeService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createGearshiftType(body): Observable<any> {
    return this.http.post(this.baseUrl + 'gearshift-types', body);
  }

  public updateGearshiftType(body, id): Observable<any> {
    return this.http.put(this.baseUrl + `gearshift-types/${id}/gearshift-type`, body);
  }

  public getGearshiftType(id): Observable<any> {
    return this.http.get(this.baseUrl + `gearshift-types/${id}/gearshift-type`);
  }

  public getAllGearshiftTypes(): Observable<any> {
    return this.http.get(this.baseUrl + `gearshift-types`);
  }

  public deleteGearshiftType(id): Observable<any> {
    return this.http.delete(this.baseUrl + `gearshift-types/${id}/gearshift-type`);
  }
}
