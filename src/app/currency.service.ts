import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiBaseUrl = ' https://v6.exchangerate-api.com/v6';

  constructor(private http: HttpClient) {}


  getCurrencyList(): Observable<any> {
    return this.http.get(this.apiBaseUrl);
  }

  getExchangeRates(baseCurrency: string): Observable<any> {
    const url = `${this.apiBaseUrl}?base=${baseCurrency}`;
    return this.http.get(url);
  }
}
