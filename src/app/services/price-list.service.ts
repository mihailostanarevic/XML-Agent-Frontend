import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public createPriceList(body): Observable<any> {
    return this.http.post(this.baseUrl + 'price-lists', body);
  }

  public updatePriceList(body): Observable<any> {
    return this.http.put(this.baseUrl + `price-lists`, body);
  }

  public getPriceList(id): Observable<any> {
    return this.http.get(this.baseUrl + `price-lists/${id}`);
  }

  public getPriceListByAgent(id): Observable<any> {
    return this.http.get(this.baseUrl + `price-lists/${id}/agent`);
  }

  public deletePriceListByAgent(id): Observable<any> {
    return this.http.delete(this.baseUrl + `price-lists/${id}/agent`);
  }

  public deletePriceList(id): Observable<any> {
    return this.http.delete(this.baseUrl + `price-lists/${id}`);
  }

  public getAllPriceLists(): Observable<any> {
    return this.http.get(this.baseUrl + `price-lists`);
  }

  public getTotalEarningsByAgent(id): Observable<any> {
    return this.http.get(this.baseUrl + `price-lists/total-earnings/${id}/agent`);
  }
}
